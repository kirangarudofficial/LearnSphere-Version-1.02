# Export Service

## Overview
Data export functionality for users and administrators.

## Responsibilities
- User data export (GDPR compliance)
- Course content export
- Analytics data export
- Multiple format support (CSV, PDF, Excel, JSON)
- Bulk export capabilities
- Scheduled exports

## API Endpoints
```http
POST   /api/export/user-data          # Export user data
POST   /api/export/course/:id         # Export course content
POST   /api/export/analytics          # Export analytics
GET    /api/export/jobs               # Get export jobs
GET    /api/export/download/:id       # Download export file
```

## Supported Formats
- CSV - Tabular data
- PDF - Reports and documents  
- Excel (.xlsx) - Spreadsheets
- JSON - Raw data export

## Integration
- All services - Data sources
- Media Service - File storage
