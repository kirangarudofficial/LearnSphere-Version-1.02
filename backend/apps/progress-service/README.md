# Progress Service

## Overview
Tracks and manages student learning progress, completion status, and learning analytics.

## Responsibilities

- **Progress Tracking** - Track lesson/module completion
- **Completion Analytics** - Calculate completion percentages
- **Time Tracking** - Monitor time spent learning
- **Learning Streaks** - Track daily/weekly streaks
- **Milestone Tracking** - Achievement milestones
- **Progress Reports** - Generate progress reports

## API Endpoints

```http
GET    /api/progress/:courseId           # Get course progress
PUT    /api/progress/:courseId/lesson/:id # Mark lesson complete
GET    /api/progress/stats               # Get user stats
GET    /api/progress/streak              # Get learning streak
POST   /api/progress/reset/:courseId     # Reset course progress
GET    /api/progress/report/:courseId    # Get progress report
```

## Data Models

### UserProgress
```typescript
{
  userId: string
  courseId: string
  lessonId: string
  isCompleted: boolean
  completedAt?: Date
  timeSpent: number  // in seconds
  lastAccessedAt: Date
}
```

### CourseProgress
```typescript
{
  userId: string
  courseId: string
  completedLessons: number
  totalLessons: number
  completionPercentage: number
  totalTimeSpent: number
  startedAt: Date
  lastAccessedAt: Date
}
```

## Business Logic

### Progress Calculation
```typescript
completionPercentage = (completedLessons / totalLessons) * 100
isComplete = completionPercentage === 100
```

### Certificate Eligibility
- Must complete 100% of lessons
- Must complete all quizzes
- Must pass final assessment (if applicable)

## Integration
- **Course Service** - Lesson structure
- **Certificate Service** - Trigger certificate generation
- **Gamification Service** - Award points/badges
- **Analytics Service** - Learning analytics