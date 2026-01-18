# Learning Hub - Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- Backend services running
- Environment variables configured

## Environment Setup

### 1. Development

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your local configuration
# Default API URL: http://localhost:3000/api
```

### 2. Production

Set the following environment variables in your deployment platform:

```
VITE_API_URL=https://api.learninghub.com/api
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
VITE_STRIPE_PUBLIC_KEY=your-stripe-key
```

## Build for Production

```bash
# Install dependencies
npm install

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Deployment Options

### Option 1: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Docker

```bash
# Build Docker image
docker build -t learning-hub-frontend .

# Run container
docker run -p 3000:80 learning-hub-frontend
```

## Performance Optimization

### Code Splitting
- All routes are lazy-loaded
- Components split by feature
- Vendor chunks optimized

### Asset Optimization
- Images: Use WebP format
- Fonts: Preload critical fonts
- CSS: Minified and extracted

### Caching Strategy
- Static assets: 1 year cache
- HTML: No cache
- API responses: Configurable

## Security Checklist

- [x] Input sanitization implemented
- [x] XSS prevention
- [x] CSRF protection (backend)
- [x] Secure headers configured
- [x] Environment variables secured
- [x] Dependencies updated

## Monitoring

### Error Tracking
- Sentry configured for production errors
- User context captured
- Breadcrumbs for debugging

### Analytics
- Google Analytics for user behavior
- Custom events tracked
- Performance metrics monitored

### Performance
- Web Vitals monitored
- Page load timing logged
- API response times tracked

## Testing Before Deploy

```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Build test
npm run build

# Preview build
npm run preview
```

## Post-Deployment Verification

1. **Functionality Check**
   - Login/logout works
   - Course enrollment works
   - Payment flow works
   - All pages load

2. **Performance Check**
   - Lighthouse score > 90
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3.5s

3. **Error Monitoring**
   - Check Sentry for errors
   - Review console logs
   - Test error boundaries

## Rollback Plan

```bash
# Vercel rollback
vercel rollback

# Netlify rollback
netlify rollback
```

## Support

For deployment issues, check:
- Environment variables are set correctly
- API endpoints are accessible
- DNS records are configured
- SSL certificates are valid
