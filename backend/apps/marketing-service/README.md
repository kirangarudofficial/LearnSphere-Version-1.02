# Marketing Service

## Overview
Marketing campaign management, email campaigns, and promotional tools.

## Responsibilities
- Email campaign creation and management
- Campaign segmentation and targeting
- A/B testing for campaigns
- Campaign analytics and ROI tracking  
- Drip campaigns and automation
- Landing page creation

## API Endpoints
```http
POST   /api/marketing/campaign         # Create campaign
GET    /api/marketing/campaigns        # List campaigns
POST   /api/marketing/campaign/:id/send # Send campaign
GET    /api/marketing/campaign/:id/stats # Campaign stats
POST   /api/marketing/segment          # Create segment
GET    /api/marketing/templates        # Email templates
```

## Campaign Types
- Promotional emails
- Course launch campaigns
- Re-engagement campaigns
- Newsletter campaigns
- Drip sequences

## Integration
- Email Service - Email delivery
- User Service - Audience segmentation
- Analytics Service - Campaign tracking
