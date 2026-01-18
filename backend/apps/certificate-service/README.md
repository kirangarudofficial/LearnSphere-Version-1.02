# Certificate Service

## Overview
Generates, manages, and validates course completion certificates.

## Responsibilities

- **Certificate Generation** - Auto-generate on completion
- **Certificate Design** - Customizable templates
- **PDF Generation** - Create downloadable PDFs
- **Certificate Validation** - Verify certificate authenticity
- **Certificate Storage** - Store and retrieve certificates
- **Sharing & Export** - Share on LinkedIn, download

## API Endpoints

```http
GET    /api/certificates/my-certificates  # Get user certificates
GET    /api/certificates/:id              # Get certificate details
GET    /api/certificates/:id/download     # Download PDF
GET    /api/certificates/:id/verify       # Verify certificate
POST   /api/certificates/:id/share        # Share certificate
GET    /api/certificates/validate/:code   # Public validation
```

## Data Models

### Certificate
```typescript
{
  id: string
  userId: string
  courseId: string
  studentName: string
  courseName: string
  completionDate: Date
  certificateUrl: string
  verificationCode: string
  credentialId: string
  issuedBy: string
}
```

## Business Logic

### Certificate Eligibility
Certificate issued when:
1. 100% course completion
2. All quizzes passed
3. Final assessment passed (if required)
4. No integrity violations

### Certificate Features
- Unique verification code
- QR code for validation
- Blockchain verification (optional)
- Tamper-proof PDF
- LinkedIn sharing integration

## Integration
- **Progress Service** - Check completion
- **Course Service** - Course details
- **User Service** - Student details
- **Media Service** - PDF storage
- **Email Service** - Certificate email

## Environment Variables
```env
CERTIFICATE_TEMPLATE_PATH=./templates
PDF_GENERATOR=puppeteer
BLOCKCHAIN_ENABLED=false
```