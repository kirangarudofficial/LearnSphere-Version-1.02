# Assessment Service

## Overview
Manages quizzes, tests, and assessments with automatic grading and result tracking.

## Responsibilities

- **Quiz Management** - Create and manage quizzes
- **Question Bank** - Maintain question repository
- **Assessment Delivery** - Timed quiz delivery
- **Auto-Grading** - Automatic answer grading
- **Result Tracking** - Store and analyze results
- **Certificate Validation** - Final assessment for certification

## API Endpoints

```http
GET    /api/assessments/:courseId/quizzes  # Get course quizzes
GET    /api/assessments/quiz/:id            # Get quiz details
POST   /api/assessments/quiz/:id/start      # Start quiz attempt
POST   /api/assessments/quiz/:id/submit     # Submit quiz answers
GET    /api/assessments/quiz/:id/results    # Get quiz results
GET    /api/assessments/attempts            # Get user attempts
```

## Data Models

### Quiz
```typescript
{
  id: string
  courseId: string
  title: string
  description: string
  duration: number  // in minutes
  passingScore: number
  questions: Question[]
  totalPoints: number
  attemptsAllowed: number
}
```

### Question
```typescript
{
  id: string
  type: 'multiple_choice' | 'true_false' | 'short_answer'
  question: string
  options?: string[]
  correctAnswer: string
  points: number
  explanation?: string
}
```

### QuizAttempt
```typescript
{
  id: string
  userId: string
  quizId: string
  answers: Record<string, string>
  score: number
  passed: boolean
  startedAt: Date
  submittedAt: Date
  timeSpent: number
}
```

## Business Logic

### Auto-Grading
```typescript
// Multiple choice & true/false
score = answers.filter(a => a === correctAnswer).length

// Passing criteria
passed = (score / totalPoints) * 100 >= passingScore
```

### Quiz Rules
- Timer enforced (auto-submit on timeout)
- Questions randomized (optional)
- Limited attempts
- One active attempt per user
- Answers locked after submission

## Integration
- **Progress Service** - Update completion
- **Certificate Service** - Trigger on final assessment
- **Gamification Service** - Award points
- **Notification Service** - Result notifications