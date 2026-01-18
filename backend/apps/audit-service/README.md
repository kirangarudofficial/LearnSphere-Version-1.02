# Audit Service

## Overview
Activity logging, compliance tracking, and audit trail management.

## Responsibilities
- System activity logging
- User action tracking
- Compliance audit trails
- Security event logging
- Change history tracking  
- Audit report generation

## API Endpoints
```http
GET    /api/audit/logs               # Get audit logs
GET    /api/audit/user/:id           # Get user activity
GET    /api/audit/resource/:type/:id # Get resource changes
POST   /api/audit/export             # Export audit logs
GET    /api/audit/security-events    # Get security events
```

## Data Models
```typescript
interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes: Record<string, any>
  ip Address: string
  timestamp: Date
}
```

## Integration
- All services - Activity logging
