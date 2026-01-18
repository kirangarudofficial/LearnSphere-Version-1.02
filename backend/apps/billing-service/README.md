# Billing Service

## Overview
Handles invoice generation, billing history, and financial reporting.

## Responsibilities
- Invoice generation and management
- Billing history tracking
- Tax calculation
- Payment receipt generation
- Billing analytics and reports
- Dunning management (failed payments)

## API Endpoints
```http
GET    /api/billing/invoices          # Get user invoices
GET    /api/billing/invoice/:id       # Get invoice details
POST   /api/billing/invoice/:id/download # Download PDF
GET    /api/billing/payment-methods   # Get payment methods
POST   /api/billing/payment-methods   # Add payment method
GET    /api/billing/history           # Get billing history
```

## Data Models
```typescript
interface Invoice {
  id: string
  userId: string
  amount: number
  tax: number
  total: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  dueDate: Date
  paidAt?: Date
  items: InvoiceItem[]
}
```

## Integration
- Payment Service - Payment processing
- Subscription Service - Recurring billing
- User Service - Billing details
- Email Service - Invoice emails
