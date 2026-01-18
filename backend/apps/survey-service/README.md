# Survey Service

## Overview
Course feedback surveys, student satisfaction measurement, and poll management.

## Responsibilities
- Survey creation and management
- Student feedback collection
- Poll creation for quick feedback
- Response analytics
- Anonymous submission support
- Survey templates

## API Endpoints
```http
POST   /api/surveys                   # Create survey
GET    /api/surveys/:courseId         # Get course surveys
POST   /api/surveys/:id/respond       # Submit response
GET    /api/surveys/:id/results       # Get results (instructor)
GET    /api/surveys/templates         # Survey templates
POST   /api/surveys/poll              # Create quick poll
```

## Data Models
```typescript
interface Survey {
  id: string
  courseId: string
  title: string
  questions: SurveyQuestion[]
  isAnonymous: boolean
  responseCount: number
  createdAt: Date
}

interface SurveyQuestion {
  id: string
  type: 'rating' | 'text' | 'multiple_choice'
  question: string
  options?: string[]
  required: boolean
}
```

## Survey Types
- Course satisfaction
- Lesson feedback
- Instructor rating
- Content quality
- Platform experience

## Integration
- Course Service - Course surveys
- Analytics Service - Response analytics
