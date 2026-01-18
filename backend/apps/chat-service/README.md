# Chat Service

## Overview
Real-time messaging system for direct messages and group chats.

## Responsibilities
- Real-time 1-on-1 messaging
- Group chat creation and management
- Message history and persistence
- Typing indicators
- Read receipts
- File sharing in chat
- Message search

## API Endpoints
```http
GET    /api/chat/conversations        # Get user conversations
GET    /api/chat/:conversationId      # Get messages
POST   /api/chat/send                  # Send message
POST   /api/chat/group/create          # Create group chat
PUT    /api/chat/:messageId/read       # Mark message as read
POST   /api/chat/:conversationId/typing # Send typing indicator
```

## Data Models
```typescript
interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  isGroup: boolean
  groupName?: string
}
```

## Integration
- WebSocket for real-time
- User Service - Profile data
- Notification Service - Alerts
