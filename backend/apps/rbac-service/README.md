# RBAC Service

## Overview
Role-Based Access Control for granular permissions management.

## Responsibilities
- Role definition and management
- Permission assignment
- Resource-level access control
- Dynamic permission evaluation
- Role hierarchy
- Permission auditing

## API Endpoints
```http
GET    /api/rbac/roles                # List roles
POST   /api/rbac/roles                # Create role
POST   /api/rbac/roles/:id/permissions # Assign permissions
GET    /api/rbac/check-permission     # Check permission
POST   /api/rbac/assign-role          # Assign role to user
GET    /api/rbac/user/:id/permissions # Get user permissions
```

## Default Roles
- **Student** - Course access, enrollment
- **Instructor** - Course creation, grading
- **Admin** - Full platform access
- **Moderator** - Content moderation
- **Support** - Ticket management

## Integration
- Auth Service - Permission checks
- All services - Authorization
