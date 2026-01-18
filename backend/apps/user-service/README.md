# User Service

## Overview
Manages user profiles, preferences, and user-related operations across the platform.

## Responsibilities
- User profile management (name, bio, avatar)
- User preferences and settings
- User directory and search
- Account privacy settings
- User activity tracking
- Profile completeness scoring

## API Endpoints
```http
GET    /api/users/:id                 # Get user profile
PUT    /api/users/:id                 # Update profile
GET    /api/users/search              # Search users
GET    /api/users/:id/activity        # Get user activity
PUT    /api/users/:id/preferences     # Update preferences
DELETE /api/users/:id                 # Delete account (soft)
```

## Data Models
```typescript
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  role: 'student' | 'instructor' | 'admin'
  preferences: UserPreferences
  isActive: boolean
}
```

## Integration
- Auth Service - Authentication data
- Enrollment Service - Learning history
- Progress Service - Learning stats
