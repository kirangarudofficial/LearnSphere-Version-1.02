# Assignment Service

## Overview
Manages programming and written assignments with submission, grading, and feedback.

## Responsibilities
- Assignment creation and management
- File submission handling
- Manual grading workflow
- Plagiarism detection integration
- Deadline enforcement
- Grade analytics

## API Endpoints
```http
GET    /api/assignments/:courseId     # Get course assignments
POST   /api/assignments                # Create assignment
POST   /api/assignments/:id/submit     # Submit assignment
GET    /api/assignments/:id/submissions # Get submissions (instructor)
PUT    /api/assignments/:id/grade      # Grade assignment
GET    /api/assignments/:id/feedback   # Get feedback
```

## Data Models
```typescript
interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: Date
  maxPoints: number
  allowedFileTypes: string[]
  maxFileSize: number
}

interface Submission {
  id: string
  assignmentId: string
  userId: string
  fileUrl?: string
  textAnswer?: string
  submittedAt: Date
  grade?: number
  feedback?: string
  status: 'pending' | 'graded'
}
```

## Integration
- Course Service - Assignment listing
- Media Service - File uploads
- Progress Service - Completion tracking
- Notification Service - Deadline reminders
