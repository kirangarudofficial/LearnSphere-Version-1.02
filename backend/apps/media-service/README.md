# Media Service

## Overview
Handles file uploads, media storage, image optimization, and CDN delivery for all platform assets.

## Responsibilities
- **File Upload** - Secure file upload handling
- **Image Processing** - Resize, compress, format conversion
- **Video Storage** - Video file management
- **CDN Integration** - Asset delivery via CDN
- **File Validation** - Type and size validation
- **Storage Management** - AWS S3/CloudFlare integration

## API Endpoints
```http
POST   /api/media/upload                 # Upload file
GET    /api/media/:id                    # Get file details
DELETE /api/media/:id                    # Delete file
POST   /api/media/image/resize           # Resize image
GET    /api/media/user/:userId           # Get user files
POST   /api/media/bulk-upload            # Bulk upload
```

## Supported File Types
- **Images**: JPG, PNG, GIF, WebP (max 10MB)
- **Videos**: MP4, WebM, MOV (max 500MB)
- **Documents**: PDF, DOCX, PPTX (max 25MB)

## Integration
- **AWS S3** - Primary storage
- **CloudFlare** - CDN delivery
- **Course Service** - Course images/videos
- **User Service** - Profile pictures