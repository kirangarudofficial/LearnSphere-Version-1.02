# Payment Service

## Overview
Handles all payment processing, transaction management, and financial operations for course purchases and subscriptions.

## Responsibilities

- **Payment Processing** - Process one-time and recurring payments
- **Payment Gateway Integration** - Stripe, PayPal integration
- **Transaction Management** - Track and manage all transactions
- **Refund Processing** - Handle refunds and chargebacks
- **Payment Security** - PCI compliance and secure handling
- **Invoice Generation** - Create and email invoices

## API Endpoints

```http
POST   /api/payments/create-intent      # Create payment intent
POST   /api/payments/confirm             # Confirm payment
GET    /api/payments/transactions        # Get user transactions
GET    /api/payments/:id                 # Get transaction details
POST   /api/payments/refund              # Process refund
POST   /api/payments/webhook             # Stripe webhook handler
```

## Integration
- **Stripe API** - Primary payment processor
- **Enrollment Service** - Activate course access
- **Billing Service** - Invoice generation
- **Email Service** - Payment confirmations

## Environment Variables
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYMENT_CURRENCY=USD
```
