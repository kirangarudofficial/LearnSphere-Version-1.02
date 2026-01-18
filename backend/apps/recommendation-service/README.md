# Recommendation Service

## Overview
AI-powered course recommendations and personalization engine.

## Responsibilities
- Personalized course recommendations
- Collaborative filtering
- Content-based filtering
- Similar course suggestions
- Trending course detection
- User preference learning

## API Endpoints
```http
GET    /api/recommendations/for-you    # Personalized recommendations
GET    /api/recommendations/similar/:courseId # Similar courses
GET    /api/recommendations/trending   # Trending courses
POST   /api/recommendations/feedback   # User feedback on recommendation
GET    /api/recommendations/popular    # Popular in category
```

## Recommendation Algorithms
- Collaborative filtering (user-based)
- Content-based (course metadata)
- Hybrid approach
- Popularity-based for new users

## Integration
- User Service - User history
- Course Service - Course  metadata
- Enrollment Service - Enrollment data
- Progress Service - Completion data
