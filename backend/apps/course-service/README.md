# Course Service

## Overview
Core course management service (see also Content Service for detailed course structure).

## Responsibilities
- Course CRUD operations
- Course metadata management
- Instructor course listing
- Course categorization
- Course pricing and discounts
- Course status workflow (draft/published)

## API Endpoints
```http
GET    /api/courses                   # List courses
GET    /api/courses/:id               # Get course
POST   /api/courses                   # Create course
PUT    /api/courses/:id               # Update course
DELETE /api/courses/:id               # Delete course
PATCH  /api/courses/:id/publish       # Publish course
GET    /api/courses/instructor/:id    # Instructor courses
```

## Data Models
```typescript
interface Course {
  id: string
  title: string
  instructorId: string
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'published'
  thumbnail: string
  rating: number
}
```

## Integration
- Content Service - Course content
- Enrollment Service - Student access
- Review Service - Ratings
