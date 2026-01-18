# Coupon Service

## Overview
Discount code management, validation, and tracking system.

## Responsibilities
- Coupon code creation and management
- Code validation and redemption
- Usage limit enforcement
- Expiration date handling
- Discount calculation
- Coupon analytics

## API Endpoints
```http
POST   /api/coupons                   # Create coupon
GET    /api/coupons                   # List coupons (admin)
POST   /api/coupons/validate          # Validate coupon code
POST   /api/coupons/redeem            # Redeem coupon
DELETE /api/coupons/:id               # Delete coupon
GET    /api/coupons/:id/usage         # Get usage stats
```

## Data Models
```typescript
interface Coupon {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxUses?: number
  usedCount: number
  expiresAt?: Date
  isActive: boolean
}
```

## Integration
- Cart Service - Apply discounts
- Payment Service - Price calculation
