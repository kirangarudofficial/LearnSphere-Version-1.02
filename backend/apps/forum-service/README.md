# Forum Service

## Overview
Discussion forums, Q&A threads, and community engagement.

## Responsibilities
- Forum thread management
- Post and reply handling
- Thread categorization
- Post voting (upvote/downvote)
- Best answer selection
- Thread moderation
- User reputation system

## API Endpoints
```http
GET    /api/forum/:courseId/threads   # Get course threads
POST   /api/forum/thread               # Create thread
GET    /api/forum/thread/:id           # Get thread details
POST   /api/forum/thread/:id/reply     # Reply to thread
POST   /api/forum/post/:id/vote        # Vote on post
PUT    /api/forum/post/:id/best-answer # Mark best answer
DELETE /api/forum/post/:id             # Delete post
```

## Data Models
```typescript
interface Thread {
  id: string
  courseId: string
  userId: string
  title: string
  content: string
  category: string
  views: number
  replies: number
  votes: number
  isPinned: boolean
  isClosed: boolean
  createdAt: Date
}

interface Post {
  id: string
  threadId: string
  userId: string
  content: string
  votes: number
  isBestAnswer: boolean
  createdAt: Date
}
```

## Integration
- Course Service - Forum access
- User Service - User profiles
- Notification Service - Reply notifications
- Moderation Service - Content moderation
