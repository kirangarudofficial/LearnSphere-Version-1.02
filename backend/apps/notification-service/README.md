# Notification Service

## Overview
Real-time notification delivery across multiple channels (email, push, in-app) for user engagement and system alerts.

## Responsibilities
- **Multi-Channel Delivery** - Email, push, SMS, in-app notifications
- **Notification Templates** - Template management for consistent messaging
- **Preference Management** - User notification preferences
- **Delivery Tracking** - Track open/click rates
- **Scheduled Notifications** - Delayed and scheduled delivery
- **Real-Time Alerts** - Instant notification delivery

## API Endpoints
```http
POST   /api/notifications/send           # Send notification
GET    /api/notifications/inbox          # Get user notifications
PUT    /api/notifications/:id/read       # Mark as read
GET    /api/notifications/preferences    # Get preferences
PUT    /api/notifications/preferences    # Update preferences
DELETE /api/notifications/:id            # Delete notification
```

## Data Models
```typescript
interface Notification {
  id: string
  userId: string
  type: 'course_update' | 'payment' | 'achievement'
  title: string
  message: string
  channel: 'email' | 'push' | 'sms' | 'in-app'
  isRead: boolean
  createdAt: Date
}
```

## Integration
- **Email Service** - Email delivery
- **Push Service** - Mobile push notifications
- **User Service** - User preferences
- All services - Trigger notifications