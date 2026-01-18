# Admin Service

## Overview
Administrative dashboard and platform management tools.

## Responsibilities
- Platform configuration
- System settings management
- User administration (bulk operations)
- Platform analytics
- Content moderation approval
- System health monitoring
- Feature flag control

## API Endpoints
```http
GET    /api/admin/dashboard            # Admin dashboard stats
GET    /api/admin/users                # List all users
PUT    /api/admin/users/:id/status     # Update user status
GET    /api/admin/courses/pending      # Pending course approvals
PUT    /api/admin/courses/:id/approve  # Approve course
GET    /api/admin/system/health        # System health
PUT    /api/admin/settings             # Update settings
```

## Admin Capabilities
- User management (ban, suspend, delete)
- Course approval workflow
- Content moderation
- System configuration
- Analytics and reporting
- Support ticket management

## Integration
- All services - Admin oversight
- Moderation Service - Content review
- Analytics Service - Reports