# Video Streaming Service

## Overview
Adaptive video streaming with playback controls and analytics.

## Responsibilities
- Adaptive bitrate streaming (HLS/DASH)
- Video player API
- Playback analytics
- DRM protection (optional)
- Bandwidth optimization
- Resume playback tracking

## API Endpoints
```http
GET    /api/stream/:id/manifest       # Get HLS manifest
GET    /api/stream/:id/quality/:level # Get quality stream
POST   /api/stream/:id/progress       # Update progress
GET    /api/stream/:id/analytics      # Playback analytics
POST   /api/stream/:id/bookmark       # Bookmark position
```

## Streaming Features
- Adaptive quality (auto/manual)
- Resume from last position
- Playback speed control
- Subtitle support
- Picture-in-picture

## Integration
- CDN for delivery
- Video Processing - Source videos
- Progress Service - Watch time
