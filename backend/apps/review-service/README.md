# Review Service

## Overview
Manages course reviews, ratings, and feedback collection for the platform.

## Responsibilities
- **Review Management** - Create, update, delete reviews
- **Rating System** - 5-star rating management
- **Review Moderation** - Flag inappropriate reviews
- **Helpful Votes** - Track helpful review votes
- **Instructor Response** - Instructor replies to reviews
- **Review Analytics** - Aggregate ratings and stats

## API Endpoints
```http
POST   /api/reviews/:courseId            # Create review
GET    /api/reviews/:courseId            # Get course reviews
PUT    /api/reviews/:id                  # Update review
DELETE /api/reviews/:id                  # Delete review
POST   /api/reviews/:id/helpful          # Mark review helpful
POST   /api/reviews/:id/flag             # Flag review
GET    /api/reviews/:courseId/stats      # Get rating stats
```

## Data Models
```typescript
interface Review {
  id: string
  userId: string
  courseId: string
  rating: number  // 1-5
  comment: string
  helpfulCount: number
  isFlagged: boolean
  createdAt: Date
  updatedAt: Date
}
```

## Business Logic
- One review per user per course
- Rating must be 1-5 stars
- Comment minimum 10 characters
- Cannot review own courses (instructors)
- Reviews visible only after course enrollment

## Integration
- **Course Service** - Update course rating
- **User Service** - User details
- **Moderation Service** - Review flagging