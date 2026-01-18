# Live Streaming Service

## Overview
Manages live class streaming, recording, and real-time classroom features.

## Responsibilities
- Live stream setup and hosting
- Video streaming (WebRTC/HLS)
- Recording management
- Attendance tracking
- Q&A during live sessions
- Screen sharing support
- Chat moderation

## API Endpoints
```http
POST   /api/live/stream/create        # Create live session
GET    /api/live/stream/:id/join      # Join live session
POST   /api/live/stream/:id/end       # End session
GET    /api/live/stream/:id/recording # Get recording
POST   /api/live/stream/:id/attendance # Mark attendance
GET    /api/live/upcoming             # Get upcoming sessions
```

## Data Models
```typescript
interface LiveSession {
  id: string
  courseId: string
  title: string
  scheduledAt: Date
  duration: number
  streamUrl: string
  recordingUrl?: string
  attendees: number
  status: 'scheduled' | 'live' | 'ended'
}
```

## Integration
- WebRTC/Zoom/Agora
- Course Service - Class listing
- Calendar Service - Scheduling
- Notification Service - Reminders
