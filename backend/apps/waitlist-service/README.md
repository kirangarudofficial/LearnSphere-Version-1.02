# Waitlist Service

## Overview
Course waitlist management for handling full courses and capacity.

## Responsibilities
- Waitlist registration management
- Position tracking in queue
- Automatic enrollment when spots open
- Notification on availability
- Priority waitlist management
- Capacity management

## API Endpoints
```http
POST   /api/waitlist/:courseId/join    # Join waitlist
DELETE /api/waitlist/:courseId/leave   # Leave waitlist
GET    /api/waitlist/:courseId/position # Get position
GET    /api/waitlist/my-waitlists      # Get user waitlists
PUT    /api/waitlist/:courseId/priority # Update priority (admin)
```

## Data Models
```typescript
interface WaitlistEntry {
  id: string
  userId: string
  courseId: string
  position: number
  joinedAt: Date
  priority: 'normal' | 'high'
  notifyOnAvailability: boolean
}
```

## Integration
- Course Service - Capacity checks
- Enrollment Service - Auto-enroll
- Notification Service - Availability alerts
