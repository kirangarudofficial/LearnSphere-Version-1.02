# Webhook Service

## Overview
Webhook management, event subscriptions, and external integrations.

## Responsibilities
- Webhook registration and management
- Event subscription management
- Webhook delivery with retry logic
- Webhook signing and verification
- Delivery status tracking
- Rate limiting for webhooks

## API Endpoints
```http
POST   /api/webhooks/register         # Register webhook
GET    /api/webhooks                  # List webhooks
PUT    /api/webhooks/:id              # Update webhook
DELETE /api/webhooks/:id              # Delete webhook
GET    /api/webhooks/:id/deliveries   # Get delivery history
POST   /api/webhooks/:id/test         # Test webhook
```

## Events
- user.created
- course.published
- enrollment.created
- payment.completed
- certificate.issued

## Integration
- All services - Trigger events
- External systems - Receive webhooks
