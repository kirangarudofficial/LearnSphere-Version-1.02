# Gamification Service

## Overview
Points, badges, achievements, and leaderboards to drive engagement.

## Responsibilities
- Points system management
- Badge creation and awarding
- Achievement tracking
- Leaderboard management
- Level progression
- Reward redemption
- Daily/weekly challenges

## API Endpoints
```http
GET    /api/gamification/points        # Get user points
GET    /api/gamification/badges        # Get user badges
GET    /api/gamification/leaderboard   # Get leaderboard
POST   /api/gamification/award         # Award points/badge
GET    /api/gamification/achievements  # Get achievements
GET    /api/gamification/challenges    # Get active challenges
```

## Data Models
```typescript
interface UserPoints {
  userId: string
  totalPoints: number
  level: number
  rank: number
  streak: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  pointsRequired: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}
```

## Point Awards
- Complete lesson: 10 points
- Complete quiz: 25 points
- Perfect quiz score: 50 points
- Complete course: 500 points
- Daily login: 5 points
- 7-day streak: 100 points

## Integration
- Progress Service - Completion events
- Assessment Service - Quiz scores