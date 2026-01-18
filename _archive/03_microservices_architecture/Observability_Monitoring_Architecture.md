# Observability & Monitoring Architecture

## 📊 **OVERVIEW**

This document describes the complete observability stack for monitoring 47 microservices on AWS EKS.

---

## 🎯 **MONITORING PHILOSOPHY**

**Three Pillars of Observability:**
1. **Metrics** - What is happening? (Prometheus + CloudWatch)
2. **Logs** - Why is it happening? (Fluent Bit + CloudWatch Logs)
3. **Traces** - Where is it happening? (AWS X-Ray)

---

## 📈 **METRICS COLLECTION**

### **Prometheus Stack**

**Deployment:**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring

---
# Prometheus Server
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 2
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config
          mountPath: /etc/prometheus
        - name: storage
          mountPath: /prometheus
      volumes:
      - name: config
        configMap:
          name: prometheus-config
      - name: storage
        persistentVolumeClaim:
          claimName: prometheus-pvc
```

**Prometheus Configuration:**
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # Kubernetes API Server
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
    - role: endpoints

  # Kubernetes Nodes
  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
    - role: node

  # All Microservices
  - job_name: 'microservices'
    kubernetes_sd_configs:
    - role: pod
      namespaces:
        names:
        - core
        - learning
        - media
        - engagement
        - commerce
        - analytics
        - platform
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
      action: replace
      target_label: __metrics_path__
      regex: (.+)
    - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
      action: replace
      regex: ([^:]+)(?::\d+)?;(\d+)
      replacement: $1:$2
      target_label: __address__
```

**Exporters:**
- **Node Exporter:** Node-level metrics (CPU, memory, disk, network)
- **kube-state-metrics:** Kubernetes object states
- **cAdvisor:** Container metrics
- **Custom exporters:** Application-specific metrics

---

### **Application Metrics**

Each microservice exposes `/metrics` endpoint:

```typescript
// NestJS Prometheus Integration
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
})
export class AppModule {}
```

**Custom Metrics:**
```typescript
import { Counter, Histogram } from 'prom-client';

// Request counter
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Response time histogram
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5],
});

// Business metrics
const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total number of orders',
  labelNames: ['status'],
});
```

---

### **CloudWatch Container Insights**

**Installation:**
```bash
kubernetes apply -f https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cloudwatch-namespace.yaml

kubectl apply -f https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cwagent/cloudwatch-agent-daemonset.yaml
```

**Metrics Collected:**
- Pod CPU/Memory utilization
- Node performance
- Container restarts
- Network I/O
- Storage usage

---

## 📝 **LOG AGGREGATION**

### **Fluent Bit DaemonSet**

**Deployment:**
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: fluent-bit
  template:
    metadata:
      labels:
        app: fluent-bit
    spec:
      serviceAccountName: fluent-bit
      containers:
      - name: fluent-bit
        image: amazon/aws-for-fluent-bit:latest
        env:
        - name: AWS_REGION
          value: "us-east-1"
        - name: CLUSTER_NAME
          value: "learning-hub-eks"
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: fluent-bit-config
          mountPath: /fluent-bit/etc/
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: fluent-bit-config
        configMap:
          name: fluent-bit-config
```

**Fluent Bit Configuration:**
```ini
[SERVICE]
    Flush         5
    Log_Level     info
    Parsers_File  parsers.conf

[INPUT]
    Name              tail
    Path              /var/log/containers/*.log
    Parser            docker
    Tag               kube.*
    DB                /var/log/flb_kube.db

[FILTER]
    Name                kubernetes
    Match               kube.*
    Kube_URL            https://kubernetes.default.svc:443
    Merge_Log           On
    Keep_Log            Off

[OUTPUT]
    Name                cloudwatch_logs
    Match               kube.*
    region              us-east-1
    log_group_name      /aws/eks/learning-hub/application
    log_stream_prefix   from-fluent-bit-
    auto_create_group   true
```

**Log Groups:**
- `/aws/eks/learning-hub/application` - Application logs
- `/aws/eks/learning-hub/dataplane` - Node logs
- `/aws/eks/learning-hub/host` - System logs

**Retention Policy:**
- Application logs: 30 days
- Data plane logs: 7 days
- Archive to S3: 1 year

---

### **Structured Logging**

**NestJS Winston Logger:**
```typescript
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

WinstonModule.forRoot({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// Usage
logger.log({
  level: 'info',
  message: 'User login successful',
  userId: '12345',
  ip: '192.168.1.1',
  timestamp: new Date().toISOString(),
  service: 'user-service',
});
```

---

## 🔍 **DISTRIBUTED TRACING**

### **AWS X-Ray Integration**

**X-Ray Daemon DaemonSet:**
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: xray-daemon
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: xray-daemon
  template:
    metadata:
      labels:
        app: xray-daemon
    spec:
      containers:
      - name: xray-daemon
        image: amazon/aws-xray-daemon:latest
        ports:
        - containerPort: 2000
          protocol: UDP
```

**Application Integration:**
```typescript
import * as AWSXRay from 'aws-xray-sdk-core';
import * as AWS from 'aws-sdk';

// Instrument AWS SDK
const awsSDK = AWSXRay.captureAWS(AWS);

// Instrument HTTP requests
const http = AWSXRay.captureHTTPs(require('http'));

// Custom segments
const segment = AWSXRay.getSegment();
const subsegment = segment.addNewSubsegment('database-query');
try {
  // Database operation
  const result = await prisma.user.findMany();
  subsegment.close();
  return result;
} catch (error) {
  subsegment.addError(error);
  subsegment.close();
  throw error;
}
```

**Trace Sampling:**
- 100% of errors
- 10% of successful requests
- All requests > 3 seconds

---

## 📊 **VISUALIZATION - GRAFANA**

### **Dashboard Structure**

**1. Infrastructure Overview Dashboard:**
- Cluster CPU/Memory utilization
- Node count & health
- Pod distribution
- Network I/O
- Storage usage

**2. Application Performance Dashboard:**
- Request rate (req/sec) per service
- Response time percentiles (p50, p95, p99)
- Error rates (4xx, 5xx)
- Active connections
- Queue lengths

**3. Business Metrics Dashboard:**
- Active users
- Course enrollments
- Video watch time
- Payment transactions
- Revenue metrics

**4. Database Dashboard:**
- Query performance
- Connection pool usage
- Slow queries
- Replication lag
- Cache hit ratio

**5. Service-Specific Dashboards:**
One dashboard per namespace with all services

---

### **Grafana Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - containerPort: 3000
        env:
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secrets
              key: admin-password
        volumeMounts:
        - name: grafana-storage
          mountPath: /var/lib/grafana
      volumes:
      - name: grafana-storage
        persistentVolumeClaim:
          claimName: grafana-pvc
```

---

## 🚨 **ALERTING**

### **Prometheus AlertManager**

**Alert Rules:**
```yaml
groups:
- name: microservices
  interval: 30s
  rules:
  # High error rate
  - alert: HighErrorRate
    expr: sum(rate(http_requests_total{status=~"5.."}[5m])) by (service) > 10
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High 5xx error rate for {{ $labels.service }}"
      description: "{{ $labels.service }} has {{ $value }} errors/sec"

  # High latency
  - alert: HighLatency
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "High latency detected"
      description: "95th percentile latency is {{ $value }} seconds"

  # Pod restarts
  - alert: PodRestartingFrequently
    expr: rate(kube_pod_container_status_restarts_total[1h]) > 5
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "Pod {{ $labels.pod }} restarting frequently"

  # Node down
  - alert: NodeDown
    expr: up{job="kubernetes-nodes"} == 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Node {{ $labels.instance }} is down"

  # Database connection pool exhausted
  - alert: DatabaseConnectionPoolExhausted
    expr: database_connection_pool_busy / database_connection_pool_size > 0.9
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Database connection pool nearly exhausted"
```

---

### ** CloudWatch Alarms**

**Lambda for Auto-Remediation:**
```python
import boto3

def lambda_handler(event, context):
    # Parse alarm
    alarm_name = event['detail']['alarmName']
    
    # Auto-scale EKS nodes
    if 'HighCPU' in alarm_name:
        autoscaling = boto3.client('autoscaling')
        autoscaling.set_desired_capacity(
            AutoScalingGroupName='eks-node-group',
            DesiredCapacity=current + 2
        )
    
    # Restart pod
    elif 'Unhealthy' in alarm_name:
        # Trigger kubectl rollout restart
        pass
```

---

### **Alert Routing**

**AlertManager Configuration:**
```yaml
route:
  group_by: ['alertname', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'
  
  routes:
  # Critical alerts to PagerDuty
  - match:
      severity: critical
    receiver: pagerduty
    continue: true
  
  # Warnings to Slack
  - match:
      severity: warning
    receiver: slack
  
  # Info to email
  - match:
      severity: info
    receiver: email

receivers:
- name: 'default'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/xxx'
    channel: '#alerts'

- name: 'pagerduty'
  pagerduty_configs:
  - service_key: 'xxx'

- name: 'slack'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/xxx'
    channel: '#warnings'

- name: 'email'
  email_configs:
  - to: 'ops-team@company.com'
```

---

## 🏥 **HEALTH CHECKS**

### **Kubernetes Probes**

**Liveness Probe:**
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3000
  initialDelaySeconds: 60
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

**Readiness Probe:**
```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

**Implementation:**
```typescript
@Controller('health')
export class HealthController {
  @Get('live')
  liveness() {
    return { status: 'ok' };
  }

  @Get('ready')
  async readiness() {
    // Check database connection
    await this.prisma.$queryRaw`SELECT 1`;
    
    // Check Redis
    await this.redis.ping();
    
    return { status: 'ready' };
  }
}
```

---

## 🔥 **INCIDENT MANAGEMENT**

### **Alert → Response Flow**

```
1. Alert Triggered (Prometheus/CloudWatch)
   ↓
2. AlertManager Routes Alert
   ↓
3. PagerDuty Creates Incident
   ↓
4. On-Call Engineer Notified
   ↓
5. Engineer Acknowledges
   ↓
6. Runbook Consulted
   ↓
7. Issue Resolved
   ↓
8. Post-Mortem Created
```

**Auto-Remediation:**
- Pod crashes → Automatic restart (Kubernetes)
- High CPU → Auto-scale pods (HPA)
- Memory leak → Automatic OOM kill + restart
- Failed deployment → Automatic rollback (ArgoCD)

---

## 📊 **KEY METRICS TRACKED**

### **Golden Signals (Google SRE):**

1. **Latency:** Response time for requests
2. **Traffic:** Request rate
3. **Errors:** Error rate
4. **Saturation:** Resource utilization

### **RED Method:**

- **Rate:** Requests per second
- **Errors:** Number of failed requests
- **Duration:** Time to process requests

### **USE Method:**

- **Utilization:** % time resource is busy
- **Saturation:** Queue depth
- **Errors:** Error count

---

## 💰 **COST OPTIMIZATION**

**Monthly Monitoring Costs:**
- Prometheus (self-hosted): $50 (EBS)
- CloudWatch Logs: ~$100 (ingestion + storage)
- CloudWatch Metrics: ~$30
- X-Ray: ~$20
- **Total:** ~$200/month

**Optimization:**
- Sample traces (10% vs 100%)
- Aggregate logs before sending
- Use shorter retention for non-critical logs
- Use S3 for long-term log storage

---

## 🎯 **SLI/SLO/SLA**

**Service Level Indicators (SLI):**
- API availability
- Response time
- Error rate

**Service Level Objectives (SLO):**
- 99.9% uptime (43 minutes downtime/month)
- p95 latency < 200ms
- Error rate < 0.1%

**Service Level Agreement (SLA):**
- 99.5% uptime guarantee
- <500ms response time
- 24/7 support

---

**This observability stack provides complete visibility into all 47 microservices!** 📊
