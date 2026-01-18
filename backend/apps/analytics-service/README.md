# Analytics Service

## Overview
Platform analytics, user behavior tracking, and business intelligence.

## Responsibilities
- User behavior analytics
- Course performance metrics
- Revenue analytics
- Engagement tracking
- Conversion funnels
- Custom dashboard creation
- Real-time metrics

## API Endpoints
```http
GET    /api/analytics/dashboard       # Get dashboard metrics
GET    /api/analytics/users           # User analytics
GET    /api/analytics/courses         # Course analytics
GET    /api/analytics/revenue         # Revenue analytics
GET    /api/analytics/engagement      # Engagement metrics
POST   /api/analytics/track-event     # Track custom event
GET    /api/analytics/funnel          # Conversion funnel
```

## Data Models
```typescript
interface AnalyticsEvent {
  id: string
  userId?: string
  event: string
  properties: Record<string, any>
  timestamp: Date
}

interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  totalRevenue: number
  enrollmentRate: number
  completionRate: number
}
```

## Integration
- All services - Event tracking
- User Service - User metrics
- Course Service - Course metrics
- Payment Service - Revenue data
