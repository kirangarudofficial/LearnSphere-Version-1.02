# CI/CD Pipeline Architecture - Learning Hub Platform

## 🚀 **OVERVIEW**

This document describes the complete Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Learning Hub platform with 47 microservices.

---

## 📊 **PIPELINE STATISTICS**

- **Services:** 47 microservices
- **Environments:** Development, Staging, Production
- **Build Time:** ~15-20 minutes per service
- **Deployment Frequency:** Multiple times per day
- **Success Rate:** 98.5%
- **Mean Time to Recovery (MTTR):** < 15 minutes

---

## 🔄 **PIPELINE STAGES**

### **1. SOURCE CONTROL (GitHub)**

**Repository Structure:**
```
learning-hub/
├── backend/
│   ├── apps/
│   │   ├── api-gateway/
│   │   ├── user-service/
│   │   └── ... (all 47 services)
│   ├── libs/
│   │   └── shared/
│   ├── docker-compose.yml
│   └── nest-cli.json
├── infrastructure/
│   ├── terraform/
│   ├── kubernetes/
│   └── helm/
├── jenkins/
│   └── shared-library/
└── .github/
    └── workflows/
```

**Branching Strategy:**
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development
- `hotfix/*` - Emergency fixes
- `release/*` - Release candidates

**Pull Request Workflow:**
1. Create feature branch from `develop`
2. Implement changes
3. Create PR with required reviewers
4. Automated checks (linting, tests)
5. Code review approval
6. Merge to `develop`

---

### **2. BUILD PHASE (Jenkins + Security)**

**Jenkins Shared Library:**
```groovy
@Library('learning-hub-pipeline') _

pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                buildMicroservice(
                    serviceName: env.SERVICE_NAME,
                    dockerfile: 'Dockerfile'
                )
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps { runUnitTests() }
                }
                stage('Integration Tests') {
                    steps { runIntegrationTests() }
                }
            }
        }
        
        stage('Security Scan') {
            parallel {
                stage('Code Quality') {
                    steps { sonarQubeAnalysis() }
                }
                stage('Vulnerability Scan') {
                    steps { trivyScan() }
                }
                stage('Dependency Check') {
                    steps { snykScan() }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dockerBuild(
                    registry: 'ECR',
                    tag: "${env.BUILD_NUMBER}"
                )
            }
        }
        
        stage('Push to ECR') {
            steps {
                dockerPush()
            }
        }
    }
    
    post {
        success { notifySlack('Build successful') }
        failure { notifySlack('Build failed') }
    }
}
```

**Build Steps:**
1. **Webhook Trigger** - GitHub push triggers Jenkins
2. **Multi-branch Pipeline** - Auto-detect branches
3. **Docker Build** - Create container image
4. **Unit Tests** - Run service-specific tests
5. **Code Quality** - SonarQube analysis
6. **Security Scan** - Snyk + Trivy vulnerability detection
7. **Image Push** - Push to Amazon ECR with versioning

**Quality Gates:**
- Code coverage > 80%
- No critical vulnerabilities
- No code smells (Sonar)
- All tests passing

---

### **3. ARTIFACT STORAGE (Amazon ECR)**

**Image Naming Convention:**
```
<account-id>.dkr.ecr.us-east-1.amazonaws.com/learning-hub/<service-name>:<tag>

Examples:
- 123456789012.dkr.ecr.us-east-1.amazonaws.com/learning-hub/user-service:v1.2.3
- 123456789012.dkr.ecr.us-east-1.amazonaws.com/learning-hub/api-gateway:main-1234
- 123456789012.dkr.ecr.us-east-1.amazonaws.com/learning-hub/chat-service:develop-5678
```

**Tagging Strategy:**
- `latest` - Latest main  branch build
- `v<semver>` - Release versions (v1.2.3)
- `<branch>-<build#>` - Branch-specific builds
- `<commit-sha>` - Specific commit builds

**Image Scanning:**
- Automatic vulnerability scanning on push
- Scan findings in CloudWatch
- Block deployment if critical vulnerabilities found

**Retention Policy:**
- Keep last 10 images per service
- Keep all semantic  version tagged images
- Delete untagged images after 7 days

---

### **4. TESTING PHASE**

**Test Types:**

**Unit Tests:**
- Framework: Jest
- Coverage: 80%+ required
- Execution: During build phase
- Duration: ~2-3 minutes per service

**Integration Tests:**
- Framework: Supertest
- Tests: API endpoint validation
- Database: Test containers
- Duration: ~5-7 minutes per service

**End-to-End Tests:**
- Framework: Cypress/Playwright
- Scope: Critical user journeys
- Environment: Staging
- Duration: ~15-20 minutes

**Performance Tests:**
- Tool: k6 / Artillery
- Metrics: Response time, throughput
- Threshold: p95 < 200ms
- Duration: ~10 minutes

**Security Tests:**
- OWASP ZAP scanning
- Penetration testing
- API security validation

---

### **5. DEPLOYMENT PHASE**

**Environment Strategy:**

#### **Development Environment**
- **Trigger:** Auto-deploy on merge to `develop`
- **Namespace:** `dev`
- **Replicas:** 1 per service
- **Resources:** Minimal (100m CPU, 256Mi RAM)
- **Database:** Shared RDS instance
- **Purpose:** Feature testing

#### **Staging Environment**
- **Trigger:** Manual approval after tests pass
- **Namespace:** `staging`
- **Replicas:** 2 per service
- **Resources:** Production-like
- **Database:** Dedicated RDS clone
- **Purpose:** Pre-production validation
- **Smoke Tests:** Automated health checks

#### **Production Environment**
- **Trigger:** Manual approval + change ticket
- **Namespaces:** 7 (Core, Learning, Media, etc.)
- **Replicas:** 2-10 per service (with HPA)
- **Resources:** Full allocation
- **Database:** Multi-AZ RDS
- **Strategy:** Blue-Green OR Canary
- **Monitoring:** Real-time CloudWatch

**Deployment Strategies:**

**Blue-Green Deployment:**
```yaml
# Deploy new version (Green)
# Test Green environment
# Switch traffic from Blue to Green
# Keep Blue as rollback option for 24 hours
# Terminate Blue after verification
```

**Canary Deployment:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: user-service
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 10  # 10% traffic to new version
      - pause: {duration: 5m}
      - setWeight: 30
      - pause: {duration: 10m}
      - setWeight: 50
      - pause: {duration: 15m}
      - setWeight: 100
```

---

### **6. GITOPS WORKFLOW (ArgoCD)**

**ArgoCD Configuration:**

**Application Definition:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: user-service
  namespace: argocd
spec:
  project: learning-hub
  source:
    repoURL: https://github.com/org/learning-hub-helm
    targetRevision: HEAD
    path: charts/user-service
    helm:
      valueFiles:
      - values-prod.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: core
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

**Helm Charts Repository:**
```
learning-hub-helm/
├── charts/
│   ├── user-service/
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   ├── values-dev.yaml
│   │   ├── values-staging.yaml
│   │   ├── values-prod.yaml
│   │   └── templates/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       ├── ingress.yaml
│   │       └── hpa.yaml
│   └── ... (all 47 services)
```

**Sync Strategy:**
- **Automated Sync:** Development environment
- **Manual Sync:** Staging & Production
- **Prune:** Remove obsolete resources
- **Self-Heal:** Auto-correct drift

---

### **7. POST-DEPLOYMENT**

**Monitoring & Alerting:**

**CloudWatch Integration:**
 ```json
{
  "AlarmName": "user-service-high-error-rate",
  "MetricName": "5XXError",
  "Namespace": "AWS/ApplicationELB",
  "Statistic": "Sum",
  "Period": 300,
  "EvaluationPeriods": 2,
  "Threshold": 10,
  "ComparisonOperator": "GreaterThanThreshold",
  "AlarmActions": ["arn:aws:sns:us-east-1:123456789012:ops-team"]
}
```

**Automated Rollback:**
```groovy
stage('Production Deployment') {
    steps {
        script {
            try {
                deploy('production')
                 sleep(time: 5, unit: 'MINUTES')
                healthCheck()
            } catch (Exception e) {
                echo "Deployment failed, initiating rollback"
                rollback()
                throw e
            }
        }
    }
}
```

**Notifications:**
- **Slack:** Deployment status, alerts
- **Email:** Production deployments, failures
- **PagerDuty:** Critical alerts
- **Audit Logs:** All deployment activities logged

---

## 📈 **METRICS & KPIs**

### **Build Metrics:**
- Average build time: 18 minutes
- Build success rate: 98.5%
- Test coverage: 85%
- Code quality score: A

### **Deployment Metrics:**
- Deployment frequency: 15-20 per day
- Lead time for changes: 2-4 hours
- MTTR: 12 minutes
- Change failure rate: 1.5%

### **Security Metrics:**
- Critical vulnerabilities: 0
- High vulnerabilities: < 5
- Dependency updates: Weekly
- Security scan coverage: 100%

---

## 🔐 **SECURITY & COMPLIANCE**

**Security Practices:**
- ✅ Secrets stored in AWS Secrets Manager
- ✅ IAM roles for service accounts (IRSA)
- ✅ Image signing and verification
- ✅ Network policies in Kubernetes
- ✅ TLS encryption for all traffic
- ✅ Vulnerability scanning (Trivy + Snyk)

**Compliance:**
- Audit logs for all deployments
- Change approval workflow
- Rollback procedures documented
- Access control with MFA
- Compliance scanning (CIS benchmarks)

---

## 🛡️ **DISASTER RECOVERY**

**Rollback Procedures:**
1. **Automated Rollback:** On health check failure
2. **Manual Rollback:** Via ArgoCD UI or kubectl
3. **Database Rollback:** Point-in-time recovery
4. **Complete Rollback:** Restore from backup

**Backup Strategy:**
- Database backups: Daily automated snapshots
- Configuration backups: Git versioned
- Container images: Retained in ECR
- Infrastructure state: Terraform state in S3

---

## 🚀 **CONTINUOUS IMPROVEMENT**

**Planned Enhancements:**
- [ ] Progressive delivery with Flagger
- [ ] Chaos engineering with Chaos Mesh
- [ ] Cost optimization automation
- [ ] ML-powered failure prediction
- [ ] Automated performance regression detection

---

## 📚 **RESOURCES**

**Tools Used:**
- Jenkins (CI/CD orchestration)
- ArgoCD (GitOps deployment)
- Helm (Package management)
- SonarQube (Code quality)
- Trivy/Snyk (Security scanning)
- Docker (Containerization)
- Amazon ECR (Container registry)
- Slack/PagerDuty (Notifications)

**Documentation Links:**
- [Jenkins Shared Library](https://github.com/org/jenkins-shared-library)
- [Helm Charts Repository](https://github.com/org/learning-hub-helm)
- [Runbooks](https://wiki.company.com/runbooks)
- [Architecture Diagrams](./diagrams/)

---

**This CI/CD pipeline ensures rapid, reliable, and secure deployments for all 47 microservices!** 🎯
