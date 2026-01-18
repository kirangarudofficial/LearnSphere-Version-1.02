# Network Architecture - AWS VPC Design

## 🌐 **OVERVIEW**

This document describes the complete network architecture for the Learning Hub platform running 47 microservices on AWS.

---

## 📊 **NETWORK STATISTICS**

- **VPC CIDR:** 10.0.0.0/16 (65,536 IPs)
- **Availability Zones:** 3 (us-east-1a, 1b, 1c)
- **Subnets:** 9 (3 public, 6 private)
- **Security Groups:** 8
- **NAT Gateways:** 3 (one per AZ)
- **VPC Endpoints:** 4

---

## 🏗️ **VPC ARCHITECTURE**

### **VPC Configuration**

```
VPC: learning-hub-vpc
CIDR: 10.0.0.0/16
Region: us-east-1
DNS Resolution: Enabled
DNS Hostnames: Enabled
```

---

## 📍 **SUBNET DESIGN**

### **PUBLIC SUBNETS (3 subnets)**

Hosts internet-facing resources with direct internet access via Internet Gateway.

| AZ | Subnet Name | CIDR | IPs | Resources |
|----|-------------|------|-----|-----------|
| us-east-1a | public-1a | 10.0.1.0/24 | 256 | IGW, ALB, NAT-1 |
| us-east-1b | public-1b | 10.0.2.0/24 | 256 | ALB, NAT-2 |
| us-east-1c | public-1c | 10.0.3.0/24 | 256 | NAT-3, Bastion |

**Public Subnet Features:**
- Auto-assign public IP: Enabled
- Route to Internet Gateway
- Hosts Application Load Balancers
- NAT Gateways for private subnet egress

---

### **PRIVATE SUBNETS - APPLICATION TIER (3 subnets)**

Hosts EKS worker nodes running all 47 microservices.

| AZ | Subnet Name | CIDR | IPs | Namespaces |
|----|-------------|------|-----|------------|
| us-east-1a | app-private-1a | 10.0.4.0/24 | 256 | Core, Learning, Media |
| us-east-1b | app-private-1b | 10.0.5.0/24 | 256 | Engagement, Commerce |
| us-east-1c | app-private-1c | 10.0.7.0/24 | 256 | Analytics, Platform |

**EKS Cluster IP Allocation:**
```
Cluster IP Range: 10.100.0.0/16 (Kubernetes service IPs)

Namespace IP Ranges:
- Core:        10.100.0.0/24 (5 services)
- Learning:    10.100.1.0/24 (11 services)
- Media:       10.100.2.0/24 (5 services)
- Engagement:  10.100.3.0/24 (10 services)
- Commerce:    10.100.4.0/24 (6 services)
- Analytics:   10.100.5.0/24 (6 services)
- Platform:    10.100.6.0/24 (5 services)
```

---

### **PRIVATE SUBNETS - DATA TIER (3 subnets)**

Hosts databases and data services.

| AZ | Subnet Name | CIDR | IPs | Resources |
|----|-------------|------|-----|-----------|
| us-east-1a | data-private-1a | 10.0.10.0/24 | 256 | RDS Primary, ElastiCache |
| us-east-1b | data-private-1b | 10.0.11.0/24 | 256 | RDS Standby, MSK Broker-1 |
| us-east-1c | data-private-1c | 10.0.12.0/24 | 256 | OpenSearch, MSK Broker-2-3 |

**Data Layer IPs:**
- RDS PostgreSQL Primary: 10.0.10.10
- RDS PostgreSQL Standby: 10.0.11.10
- ElastiCache Redis (node-1): 10.0.10.20
- ElastiCache Redis (node-2): 10.0.11.20
- ElastiCache Redis (node-3): 10.0.12.20
- MSK Kafka Broker-1: 10.0.11.30
- MSK Kafka Broker-2: 10.0.12.30
- MSK Kafka Broker-3: 10.0.12.31
- OpenSearch node-1: 10.0.12.40
- OpenSearch node-2: 10.0.10.40
- OpenSearch node-3: 10.0.11.40

---

## 🚪 **INTERNET GATEWAY & NAT GATEWAYS**

### **Internet Gateway**
```
IGW: igw-learning-hub
Attachment: Attached to VPC
Purpose: Outbound/inbound internet for public subnets
```

### **NAT Gateways (3)**

Provides internet access for private subnets while keeping them private.

| NAT Gateway | Subnet | Elastic IP | Purpose |
|-------------|--------|------------|---------|
| nat-1a | public-1a | 54.123.45.10 | Private subnet 1a egress |
| nat-1b | public-1b | 54.123.45.11 | Private subnet 1b egress |
| nat-1c | public-1c | 54.123.45.12 | Private subnet 1c egress |

**Cost Optimization:**
- Multi-AZ NAT for high availability
- Alternative: Single NAT Gateway saves ~$100/month (not recommended for production)

---

## 🛣️ **ROUTING TABLES**

### **Public Route Table**

| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | local | VPC internal routing |
| 0.0.0.0/0 | igw-id | Internet access |

**Associated Subnets:** public-1a, public-1b, public-1c

---

### **Private Route Tables (3 - one per AZ)**

**App Private Route Table -  1a:**
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | local | VPC internal |
| 0.0.0.0/0 | nat-1a | Internet via NAT |

**App Private Route Table - 1b:**
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | local | VPC internal |
| 0.0.0.0/0 | nat-1b | Internet via NAT |

**App Private Route Table - 1c:**
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | local | VPC internal |
| 0.0.0.0/0 | nat-1c | Internet via NAT |

---

### **Data Route Table**

| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | local | VPC internal only |

**Associated Subnets:** data-private-1a, data-private-1b, data-private-1c

**Note:** Data subnets have NO internet access for maximum security.

---

## 🔒 **SECURITY GROUPS**

### **SG-ALB (Application Load Balancer)**
```
Inbound Rules:
- Port 443 (HTTPS) from 0.0.0.0/0
- Port 80 (HTTP) from 0.0.0.0/0 (redirect to 443)

Outbound Rules:
- All traffic to SG-EKS-Nodes
```

### **SG-EKS-Nodes (EKS Worker Nodes)**
```
Inbound Rules:
- Ports 3000-3047 from SG-ALB (microservice ports)
- Port 443 from SG-EKS-ControlPlane (Kubernetes API)
- All traffic from self (inter-node communication)

Outbound Rules:
- Port 5432 to SG-RDS (PostgreSQL)
- Port 6379 to SG-Redis (Redis)
- Port 9092 to SG-Kafka (Kafka)
- Port 443 to 0.0.0.0/0 (ECR, S3, etc.)
```

### **SG-RDS (RDS PostgreSQL)**
```
Inbound Rules:
- Port 5432 from SG-EKS-Nodes

Outbound Rules:
- None (database doesn't initiate outbound)
```

### **SG-Redis (ElastiCache Redis)**
```
Inbound Rules:
- Port 6379 from SG-EKS-Nodes

Outbound Rules:
- None
```

### **SG-Kafka (MSK Kafka)**
```
Inbound Rules:
- Port 9092 from SG-EKS-Nodes (plaintext)
- Port 9094 from SG-EKS-Nodes (TLS)

Outbound Rules:
- Port 9092 to self (inter-broker)
```

### **SG-OpenSearch**
```
Inbound Rules:
- Port 443 from SG-EKS-Nodes (HTTPS)
- Port 9200 from SG-EKS-Nodes (REST API)

Outbound Rules:
- Port 9300 to self (cluster communication)
```

### **SG-Bastion**
```
Inbound Rules:
- Port 22 from Corporate-IP-Range (SSH)

Outbound Rules:
- Port 22 to SG-EKS-Nodes (SSH to nodes)
- Port 5432 to SG-RDS (database access)
```

### **SG-VPC-Endpoints**
```
Inbound Rules:
- Port 443 from SG-EKS-Nodes

Outbound Rules:
- None
```

---

## 🛡️ **NETWORK ACLs**

### **Public Subnet NACL**

**Inbound Rules:**
| Rule # | Type | Protocol | Port | Source | Allow/Deny |
|--------|------|----------|------|--------|------------|
| 100 | HTTP | TCP | 80 | 0.0.0.0/0 | ALLOW |
| 110 | HTTPS | TCP | 443 | 0.0.0.0/0 | ALLOW |
| 120 | SSH | TCP | 22 | Corporate-IP | ALLOW |
| 130 | Ephemeral | TCP | 1024-65535 | 0.0.0.0/0 | ALLOW |
| * | All | All | All | 0.0.0.0/0 | DENY |

**Outbound Rules:**
| Rule # | Type | Protocol | Port | Destination | Allow/Deny |
|--------|------|----------|------|-------------|------------|
| 100 | All | All | All | 0.0.0.0/0 | ALLOW |

---

### **Private Subnet NACL**

**Inbound Rules:**
| Rule # | Type | Protocol | Port | Source | Allow/Deny |
|--------|------|----------|------|--------|------------|
| 100 | All | All | All | 10.0.0.0/16 | ALLOW |
| 110 | HTTPS | TCP | 443 | 0.0.0.0/0 | ALLOW |
| 120 | Ephemeral | TCP | 1024-65535 | 0.0.0.0/0 | ALLOW |
| * | All | All | All | 0.0.0.0/0 | DENY |

**Outbound Rules:**
| Rule # | Type | Protocol | Port | Destination | Allow/Deny |
|--------|------|----------|------|-------------|------------|
| 100 | All | All | All | 0.0.0.0/0 | ALLOW |

---

## 🔗 **VPC ENDPOINTS**

### **Gateway Endpoints**

**S3 Gateway Endpoint:**
```
Service: com.amazonaws.us-east-1.s3
Type: Gateway
Route Tables: All private route tables
Policy: Full access for VPC
Savings: $0.01/GB data transfer vs NAT Gateway
```

### **Interface Endpoints**

**ECR API Endpoint:**
```
Service: com.amazonaws.us-east-1.ecr.api
Type: Interface
Subnets: app-private-1a, 1b, 1c
Security Group: SG-VPC-Endpoints
DNS: Enabled
Purpose: ECR API calls without internet
```

**ECR DKR Endpoint:**
```
Service: com.amazonaws.us-east-1.ecr.dkr
Type: Interface
Subnets: app-private-1a, 1b, 1c
Security Group: SG-VPC-Endpoints
Purpose: Docker image pulls
```

**Secrets Manager Endpoint:**
```
Service: com.amazonaws.us-east-1.secretsmanager
Type: Interface
Subnets: app-private-1a, 1b, 1c
Security Group: SG-VPC-Endpoints
Purpose: Secure credential access
```

**CloudWatch Logs Endpoint:**
```
Service: com.amazonaws.us-east-1.logs
Type: Interface
Subnets: app-private-1a, 1b, 1c  
Security Group: SG-VPC-Endpoints
Purpose: Centralized logging
```

**Cost Savings:**
- VPC Endpoints: ~$0.01/GB vs NAT Gateway data processing: ~$0.045/GB
- Monthly savings: ~$150-200 for high-data services

---

## 🌍 **EDGE SERVICES**

### **Route 53**

**Hosted Zone:** learninghub.com

**DNS Records:**
```
learninghub.com           A       ALIAS → CloudFront
api.learninghub.com       A       ALIAS → ALB
*.learninghub.com         CNAME   → CloudFront
staging.learninghub.com   A       ALIAS → ALB (staging)
```

**Health Checks:**
- ALB health check every 30  seconds
- Failover to secondary region on failure
- SNS notification on health degradation

---

### **CloudFront CDN**

**Distribution Configuration:**
```
Origin: ALB (api.learninghub.com)
Price Class: Use All Edge Locations
SSL Certificate: ACM certificate
Geo Restrictions: None
Cache Behaviors:
  - /api/* → Forward to ALB (no cache)
  - /static/* → Cache for 1 year
  - /videos/* → Cache for 30 days
Edge Locations: 400+ globally
```

**Benefits:**
- 50-60% reduction in latency
- DDoS protection (AWS Shield Standard)
- Offload ~70% of traffic from ALB

---

### **AWS WAF**

**Rule Groups:**
1. **Core Rule Set:** OWASP Top 10 protection
2. **Known Bad Inputs:** SQL injection, XSS
3. **Rate Limiting:** 2000 requests/5min per IP
4. **Geo Blocking:** Block high-risk countries (optional)
5. **Bot Control:** Managed bot protection

**Custom Rules:**
- Block IPs with failed authentication (> 10 attempts)
- Allow only valid API paths
- Block common attack patterns

---

## 🔐 **NETWORK SECURITY BEST PRACTICES**

**Implemented:**
- ✅ Private subnets for all application and data tiers
- ✅ Multi-AZ deployment for high availability
- ✅ Security Groups as primary firewall
- ✅ NACLs as secondary defense layer
- ✅ VPC Endpoints to avoid internet exposure
- ✅ Encrypted traffic (TLS 1.3)
- ✅ Bastion host with MFA for SSH access
- ✅ Flow Logs enabled for traffic analysis
- ✅ GuardDuty for threat detection

---

## 📊 **NETWORK MONITORING**

### **VPC Flow Logs**

**Configuration:**
```
Destination: CloudWatch Logs
Format: Custom (src, dst, port, protocol, bytes)
Aggregation: 1 minute
Retention: 30 days
Analysis: Athena queries for suspicious traffic
```

**Use Cases:**
- Detect unauthorized access attempts
- Troubleshoot connectivity issues
- Audit compliance
- Cost optimization (identify high-traffic sources)

---

### **CloudWatch Metrics**

**Monitored Metrics:**
- NAT Gateway bytes processed
- VPC Endpoint usage
- ALB request count & latency
- Security Group rule hits
- Network packet drops

---

## 💰 **COST OPTIMIZATION**

**Monthly Network Costs:**
- NAT Gateways (3): ~$100
- VPC Endpoints (4): ~$30
- Data Transfer: ~$200
- **Total:** ~$330/month

**Optimization Strategies:**
- Use VPC Endpoints instead of NAT for AWS services
- Enable S3 Transfer Acceleration for large uploads
- Use CloudFront for static content
- Implement request caching

---

## 🚀 **SCALABILITY**

**Current Capacity:**
- VPC: 65,536 IPs available
- Public subnets: 768 IPs (256 × 3)
- Private app subnets: 768 IPs running ~150 pods
- Private data subnets: 768 IPs

**Expansion Plan:**
- Can add more subnets if needed
- CIDR blocks can be extended
- Inter-VPC connectivity via VPC Peering/Transit Gateway

---

**This network architecture provides secure, scalable, and highly available networking for all 47 microservices!** 🌐
