# Auth Service

## Overview
Authentication and authorization service providing secure user authentication, session management, and access control for the Learning Hub platform.

## Responsibilities

### Core Functions
- **User Authentication** - Login, logout, token management
- **User Registration** - New user account creation and validation
- **Password Management** - Password reset, change, recovery flows
- **Token Management** - JWT token generation, validation, refresh
- **Session Management** - User session tracking and invalidation
- **Email Verification** - Account verification via email

### Security Features
- **JWT Authentication** - Stateless token-based authentication
- **Refresh Tokens** - Automatic token refresh for seamless UX
- **Password Hashing** - Bcrypt hashing with salt rounds
- **Rate Limiting** - Brute force protection on login attempts
- **Account Lockout** - Temporary lockout after failed attempts

## API Endpoints

### Authentication
```http
POST   /api/auth/register           # Register new user
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout
POST   /api/auth/refresh            # Refresh access token
GET    /api/auth/me                 # Get current user profile
POST   /api/auth/verify-email       # Verify email address
```

### Password Management
```http
POST   /api/auth/forgot-password    # Request password reset
POST   /api/auth/reset-password     # Reset password with token
PUT    /api/auth/change-password    # Change password (authenticated)
```

### Token Operations
```http
POST   /api/auth/validate-token     # Validate JWT token
POST   /api/auth/revoke-token       # Revoke refresh token
GET    /api/auth/active-sessions    # List user's active sessions
```

## Data Models

### User
```typescript
{
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  role: 'student' | 'instructor' | 'admin'
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
```

### RefreshToken
```typescript
{
  id: string
  userId: string
  token: string
  expiresAt: Date
  isRevoked: boolean
}
```

## Dependencies

### External Services
- **Email Service** - For verification emails
- **User Service** - For user profile management

### Infrastructure
- **PostgreSQL** - User and token storage
- **Redis** - Session and rate limiting cache

## Environment Variables

```env
# JWT Configuration
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
JWT_ISSUER=learning-hub
JWT_AUDIENCE=learning-hub-users

# Security
BCRYPT_SALT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000  # 15 minutes

# Email
EMAIL_VERIFICATION_URL=http://localhost:3000/verify-email
PASSWORD_RESET_URL=http://localhost:3000/reset-password
```

## Usage Example

### User Registration
```typescript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "message": "Verification email sent"
  }
}
```

### User Login
```typescript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "student"
    }
  }
}
```

## Security Best Practices

1. **Never log passwords** - Even hashed passwords
2. **Validate all inputs** - Email format, password strength
3. **Use HTTPS only** - Never transmit credentials over HTTP
4. **Implement rate limiting** - Prevent brute force attacks
5. **Monitor failed attempts** - Alert on suspicious activity

## Development

```bash
# Start the service
npm run start:dev

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

## Monitoring

### Health Check
```http
GET /health
```

### Metrics
- Login success/failure rate
- Token refresh rate
- Active sessions count
- Failed login attempts

## Documentation
- [JWT Best Practices](../docs/jwt-security.md)
- [Password Policy](../docs/password-policy.md)
- [Rate Limiting Strategy](../docs/rate-limiting.md)