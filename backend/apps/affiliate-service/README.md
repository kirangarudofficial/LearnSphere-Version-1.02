# Affiliate Service

## Overview
Affiliate program management, commission tracking, and referral system.

## Responsibilities
- Affiliate registration and approval
- Referral link generation
- Commission calculation and tracking
- Payout management
- Affiliate analytics and reporting
- Referral conversion tracking

## API Endpoints
```http
POST   /api/affiliate/register         # Register as affiliate
GET    /api/affiliate/dashboard        # Affiliate dashboard
GET    /api/affiliate/referral-link    # Get referral link
GET    /api/affiliate/earnings         # Get earnings
GET    /api/affiliate/commissions      # Get commission history
POST   /api/affiliate/payout           # Request payout
```

## Commission Structure
- Course sale: 20% commission
- Subscription: 30% recurring
- First-time buyer bonus: $10

## Integration
- Payment Service - Commission calculation
- User Service - Affiliate accounts
