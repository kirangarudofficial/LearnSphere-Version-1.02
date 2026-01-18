# Video Processing Service

## Overview
Video transcoding, optimization, and subtitle generation.

## Responsibilities
- Video transcoding (multiple resolutions)
- Quality optimization
- Thumbnail generation
- Subtitle/caption generation
- Video compression
- Format conversion

## API Endpoints
```http
POST   /api/video/process             # Process video
GET    /api/video/:id/status          # Get processing status
POST   /api/video/generate-thumbnail  # Generate thumbnail
POST   /api/video/generate-subtitles  # Generate subtitles
GET    /api/video/:id/qualities       # Available qualities
```

## Processing Pipeline
1. Upload raw video
2. Transcode to multiple resolutions (1080p, 720p, 480p)
3. Generate thumbnails
4. Generate subtitles (optional)
5. Store in CDN

## Integration
- FFmpeg for processing
- Media Service - Storage
- Course Service - Video lessons
