# Subscription Service

## Overview
Manages recurring subscriptions, subscription plans, and subscription lifecycle.

## Responsibilities
- **Subscription Plans** - Create and manage plans
- **Subscription Management** - Subscribe, cancel, upgrade
- **Billing Cycles** - Handle monthly/annual billing
- **Trial Periods** - Free trial management
- **Subscription Analytics** - Revenue and churn tracking
- **Auto-Renewal** - Automatic subscription renewal

## API Endpoints
```http
GET    /api/subscriptions/plans          # List subscription plans
POST   /api/subscriptions/subscribe      # Subscribe to plan
PUT    /api/subscriptions/upgrade        # Upgrade subscription
DELETE /api/subscriptions/cancel         # Cancel subscription
GET    /api/subscriptions/current        # Get current subscription
GET    /api/subscriptions/history        # Get subscription history
POST   /api/subscriptions/reactivate     # Reactivate subscription
```

## Data Models
```typescript
interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'annual'
  features: string[]
  trialDays: number
  isActive: boolean
}

interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelledAt?: Date
}
```

## Integration
- **Payment Service** - Payment processing
- **Billing Service** - Invoice generation
- **Notification Service** - Renewal reminders
- **Enrollment Service** - Access management
