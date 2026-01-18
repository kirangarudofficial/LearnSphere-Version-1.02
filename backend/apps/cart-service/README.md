# Cart Service

## Overview
Manages shopping cart operations for course purchases.

## Responsibilities
- Shopping cart management
- Cart persistence across sessions
- Coupon/discount application
- Cart total calculation
- Cart expiration handling
- Checkout preparation

## API Endpoints
```http
GET    /api/cart                      # Get user cart
POST   /api/cart/add                  # Add item to cart
DELETE /api/cart/remove/:itemId      # Remove from cart
POST   /api/cart/apply-coupon         # Apply discount code
DELETE /api/cart/clear                # Clear cart
POST   /api/cart/checkout             # Proceed to checkout
```

## Data Models
```typescript
interface Cart {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  couponCode?: string
  expiresAt: Date
}

interface CartItem {
  courseId: string
  title: string
  price: number
  discountedPrice?: number
}
```

## Integration
- Course Service - Course pricing
- Coupon Service - Discount validation
- Payment Service - Checkout flow
