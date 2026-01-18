# Enrollment Service

## Overview
Manages student course enrollments, access control, and enrollment lifecycle.

## Responsibilities

- **Enrollment Management** - Enroll/unenroll students
- **Access Control** - Verify student course access
- **Enrollment Status** - Track active, completed, dropped
- **Bulk Enrollment** - Corporate/bulk enrollments
- **Prerequisites** - Check course prerequisites
- **Capacity Management** - Track course capacity

## API Endpoints

```http
POST   /api/enrollments                  # Enroll in course
GET    /api/enrollments/my-courses       # Get user enrollments
GET    /api/enrollments/:courseId        # Get enrollment details
DELETE /api/enrollments/:courseId        # Unenroll from course
GET    /api/enrollments/:courseId/access # Check access
POST   /api/enrollments/bulk             # Bulk enroll (admin)
```

## Data Models

### Enrollment
```typescript
{
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  completedAt?: Date
  status: 'active' | 'completed' | 'dropped'
  accessExpiresAt?: Date
}
```

## Business Logic

### Enrollment Flow
1. Check course capacity
2. Check prerequisites
3. Process payment (if paid)
4. Grant access
5. Notify user
6. Update enrollment count

## Integration
- **Course Service** - Course details, capacity
- **Payment Service** - Payment verification
- **Progress Service** - Track learning progress
- **Notification Service** - Enrollment emails
