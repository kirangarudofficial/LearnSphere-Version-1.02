# Support Service

## Overview
Help desk, support ticket system, and customer support management.

## Responsibilities
- Support ticket creation and management
- Ticket routing and assignment
- Help desk knowledge base
- Ticket priority and SLA management
- Support analytics
- Multi-channel support (email, chat)

## API Endpoints
```http
POST   /api/support/ticket            # Create support ticket
GET    /api/support/tickets           # Get user tickets
GET    /api/support/ticket/:id        # Get ticket details
PUT    /api/support/ticket/:id/reply  # Reply to ticket
PUT    /api/support/ticket/:id/close  # Close ticket
GET    /api/support/knowledge-base    # Get KB articles
```

## Data Models
```typescript
interface SupportTicket {
  id: string
  userId: string
  subject: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  assignedTo?: string
  createdAt: Date
}
```

## Integration
- User Service - Customer details
- Email Service - Ticket notifications
