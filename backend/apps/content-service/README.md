# Course Service

## Overview
Core service managing course content, curriculum structure, and instructional materials for the Learning Hub platform.

## Responsibilities

### Course Management
- **Course CRUD** - Create, read, update, delete courses
- **Course Publishing** - Draft, review, publish workflow
- **Course Categorization** - Category and tag management
- **Course Search** - Full-text search and filtering
- **Course Pricing** - Pricing tiers and discount management

### Content Organization
- **Module Management** - Course section organization
- **Lesson Management** - Individual lesson content
- **Resource Management** - Downloadable materials and attachments
- **Prerequisites** - Course and lesson dependencies

### Instructor Features
- **Instructor Dashboard** - Course analytics and management
- **Student Management** - View enrolled students
- **Content Updates** - Version control for course content

## API Endpoints

### Course Operations
```http
GET    /api/courses                 # List all courses (paginated)
GET    /api/courses/:id             # Get course details
POST   /api/courses                 # Create new course (instructor)
PUT    /api/courses/:id             # Update course
DELETE /api/courses/:id             # Delete course
PATCH  /api/courses/:id/publish     # Publish course
```

### Course Discovery
```http
GET    /api/courses/search          # Search courses
GET    /api/courses/category/:cat   # Get by category
GET    /api/courses/featured        # Get featured courses
GET    /api/courses/trending        # Get trending courses
GET    /api/courses/instructor/:id  # Get instructor courses
```

### Module & Lesson Management
```http
GET    /api/courses/:id/modules     # Get course modules
POST   /api/courses/:id/modules     # Add module
PUT    /api/modules/:id             # Update module
DELETE /api/modules/:id             # Delete module

GET    /api/modules/:id/lessons     # Get module lessons
POST   /api/modules/:id/lessons     # Add lesson
PUT    /api/lessons/:id             # Update lesson
DELETE /api/lessons/:id             # Delete lesson
```

## Data Models

### Course
```typescript
{
  id: string
  title: string
  description: string
  instructorId: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  language: string
  thumbnail: string
  status: 'draft' | 'published' | 'archived'
  enrollmentCount: number
  rating: number
  createdAt: Date
  updatedAt: Date
}
```

### Module
```typescript
{
  id: string
  courseId: string
  title: string
  description: string
  order: number
  duration: number  // in minutes
}
```

### Lesson
```typescript
{
  id: string
  moduleId: string
  title: string
  content: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  videoUrl?: string
  duration: number
  order: number
  isFree: boolean  // Preview lessons
}
```

## Dependencies

### External Services
- **Media Service** - Video and image storage
- **Enrollment Service** - Student enrollment data
- **Progress Service** - Learning progress tracking
- **Review Service** - Course ratings and reviews

### Infrastructure
- **PostgreSQL** - Course data storage
- **Redis** - Search result caching
- **Elasticsearch** - Full-text search (optional)

## Environment Variables

```env
# Service Configuration
COURSE_SERVICE_PORT=3001
DATABASE_URL=postgresql://...

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# Search
ENABLE_ELASTICSEARCH=false
ELASTICSEARCH_URL=http://localhost:9200

# Caching
CACHE_TTL=3600  # 1 hour
```

## Usage Examples

### Create Course
```typescript
POST /api/courses
Authorization: Bearer <token>
{
  "title": "Complete Web Development",
  "description": "Learn HTML, CSS, JavaScript...",
  "category": "web-development",
  "level": "beginner",
  "price": 49.99,
  "language": "English"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "course-uuid",
    "title": "Complete Web Development",
    "status": "draft"
  }
}
```

### Search Courses
```typescript
GET /api/courses/search?q=javascript&category=web-development&level=beginner

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "course-1",
      "title": "JavaScript Fundamentals",
      "instructor": "John Doe",
      "rating": 4.8,
      "enrollmentCount": 1250
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 45
  }
}
```

## Business Logic

### Course Publishing Flow
1. Instructor creates course (status: draft)
2. Instructor adds modules and lessons
3. Admin reviews course (optional)
4. Course published (status: published)
5. Students can enroll

### Course Search Ranking
Courses ranked by:
- Relevance score (title, description match)
- Rating (weighted 30%)
- Enrollment count (weighted 20%)
- Recency (weighted 10%)

## Development

```bash
# Start service
npm run start:dev

# Run tests
npm run test

# Seed database with sample courses
npm run seed:courses
```

## Performance Optimization

- **Caching** - Course listings cached for 1 hour
- **Pagination** - Max 100 items per page
- **Lazy Loading** - Module/lesson content loaded on demand
- **CDN** - Course thumbnails served via CDN

## Monitoring

### Health Check
```http
GET /health
```

### Metrics
- Total courses count
- Published vs draft courses
- Average course rating
- Most popular categories
- Enrollment trends

## Documentation
- [Course Creation Guidelines](../docs/course-guidelines.md)
- [Content Standards](../docs/content-standards.md)
- [Instructor Best Practices](../docs/instructor-guide.md)