# Email Service

## Overview
Email delivery system handling transactional and marketing emails.

## Responsibilities
- Email template management
- Transactional email sending
- Email queue processing
- Bounce and complaint handling  
- Email tracking (opens, clicks)
- SMTP integration (SendGrid, AWS SES)

## API Endpoints
```http
POST   /api/email/send                # Send email
POST   /api/email/send-template       # Send templated email
GET    /api/email/templates           # List templates
POST   /api/email/webhook             # Email provider webhook
GET    /api/email/status/:id          # Get delivery status
```

## Email Types
- Welcome emails
- Password reset
- Course enrollment confirmation
- Certificate delivery
- Payment receipts
- Notification digests

## Integration
- SendGrid/AWS SES
- All services - Email triggers
