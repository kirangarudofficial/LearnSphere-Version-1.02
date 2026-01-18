# Moderation Service

## Overview
Content moderation, user reporting, and automated filtering system.

## Responsibilities
- Content flagging and review
- Automated content filtering
- User report management
- Moderation queue management
- Ban/suspend users
- Content approval workflow

## API Endpoints
```http
POST   /api/moderation/flag           # Flag content
GET    /api/moderation/queue          # Get moderation queue
PUT    /api/moderation/:id/approve    # Approve content
DELETE /api/moderation/:id/reject     # Reject content
POST   /api/moderation/ban-user       # Ban user
GET    /api/moderation/reports        # Get user reports
```

## Integration
- Forum/Review/Chat - Content moderation
- Admin Service - Moderation actions
