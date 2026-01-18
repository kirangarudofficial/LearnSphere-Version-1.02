# Calendar Service

## Overview
Event scheduling, class calendar, and reminder management.

## Responsibilities
- Event creation and management
- Class scheduling
- Recurring events
- Reminder/notification scheduling
- Availability management
- Calendar views (day/week/month)
- iCal export

## API Endpoints
```http
GET    /api/calendar/events           # Get user events
POST   /api/calendar/event             # Create event
PUT    /api/calendar/event/:id        # Update event
DELETE /api/calendar/event/:id        # Delete event
GET    /api/calendar/month/:date      # Get month view
POST   /api/calendar/export            # Export calendar (iCal)
```

## Data Models
```typescript
interface CalendarEvent {
  id: string
  userId: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  type: 'class' | 'assignment' | 'exam' | 'personal'
  isRecurring: boolean
  recurrenceRule?: string
}
```

## Integration
- Live Streaming - Live classes
- Assessment Service - Exams
- Assignment Service - Deadlines
