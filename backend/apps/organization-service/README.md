# Organization Service

## Overview
Corporate account and team management for enterprise customers.

## Responsibilities
- Organization account creation
- Team and department management
- Bulk user licensing
- Organization hierarchy management
- Team learning analytics
- Centralized billing

## API Endpoints
```http
POST   /api/organizations             # Create organization
GET    /api/organizations/:id         # Get organization
POST   /api/organizations/:id/teams   # Create team
POST   /api/organizations/:id/members # Add members
GET    /api/organizations/:id/analytics # Org analytics
PUT    /api/organizations/:id/settings # Update settings
```

## Integration
- User Service - Team members
- Subscription Service - Enterprise plans
- Analytics Service - Team analytics
