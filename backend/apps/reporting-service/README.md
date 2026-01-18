# Reporting Service

## Overview
Custom report generation, scheduled reports, and data exports.

## Responsibilities
- Custom report builder
- Report templates
- Scheduled report generation
- Multi-format export (PDF, CSV, Excel)
- Report distribution via email
- Report analytics and insights

## API Endpoints
```http
GET    /api/reports                   # List reports
POST   /api/reports/generate          # Generate report
GET    /api/reports/:id               # Get report details
POST   /api/reports/:id/download      # Download report
POST   /api/reports/schedule          # Schedule report
GET    /api/reports/templates         # Get templates
```

## Report Types
- User activity reports
- Course performance reports
- Revenue reports
- Enrollment reports
- Completion reports
- Custom reports

## Integration
- Analytics Service - Data source
- Email Service - Report distribution
