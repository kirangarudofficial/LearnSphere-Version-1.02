# Search Service

## Overview
Full-text search across platform content with advanced filtering.

## Responsibilities
- Course search with filters
- Full-text content search
- Search suggestions and autocomplete
- Search analytics
- Faceted search
- Search result ranking

## API Endpoints
```http
GET    /api/search                    # Global search
GET    /api/search/courses            # Course search  
GET    /api/search/suggest            # Autocomplete
POST   /api/search/index              # Index content
GET    /api/search/filters            # Available filters
GET    /api/search/trending           # Trending searches
```

## Search Features
- Full-text search
- Faceted filtering (category, level, price)
- Auto-suggest
- Typo tolerance
- Relevance ranking

## Integration
- Elasticsearch / Algolia
- Course Service - Content indexing
