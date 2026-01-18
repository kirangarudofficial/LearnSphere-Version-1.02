# Document Management Service

## Overview
Document upload, storage, versioning, and access control.

## Responsibilities
- Document upload and storage
- Version control
- Access permissions
- Document preview
- Full-text document search
- Document tagging and organization

## API Endpoints
```http
POST   /api/documents/upload           # Upload document
GET    /api/documents/:id              # Get document
GET    /api/documents/:id/versions     # Get versions
POST   /api/documents/:id/share        # Share document
DELETE /api/documents/:id              # Delete document
GET    /api/documents/course/:courseId # Get course documents
```

## Supported Formats
- PDF, DOCX, PPTX, XLSX
- TXT, MD
- Images (JPG, PNG)

## Integration
- Media Service - File storage
- Course Service - Course materials
