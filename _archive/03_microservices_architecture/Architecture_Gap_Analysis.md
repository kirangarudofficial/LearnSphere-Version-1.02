# Learning Hub - Architecture Gap Analysis

## Overview

This document identifies **ALL missing services and components** in the current Learning Hub architecture that should be added for a comprehensive, enterprise-grade e-learning platform.

---

## Current Architecture Summary

### ✅ Services Currently Implemented (13)

1. **API Gateway** - Authentication, routing, rate limiting
2. **User Service** - User management, profiles
3. **Auth Service** - Authentication, JWT tokens
4. **Course Service** - Course CRUD operations
5. **Content Service** - Lesson content management
6. **Media Service** - File upload/download
7. **Enrollment Service** - Student enrollments, progress
8. **Assessment Service** - Quizzes, assignments, grading
9. **Certificate Service** - Certificate generation
10. **Payment Service** - Payment processing, subscriptions
11. **Review Service** - Course reviews, ratings
12. **Gamification Service** - Badges, points, leaderboards
13. **Notification Service** - Email, push, in-app notifications

---

## 🔴 Missing Services & Components

### Category 1: Media & Streaming (CRITICAL)

#### 1.1 **Video Streaming Service** ⭐ HIGH PRIORITY
**Current Gap:** Media Service only handles upload/download, not streaming

**Required Features:**
- Adaptive bitrate streaming (HLS/DASH)
- Video transcoding to multiple resolutions (360p, 720p, 1080p)
- DRM (Digital Rights Management) to prevent piracy
- Video analytics (watch time, completion rate, drop-off points)
- Subtitle/caption support
- Video player controls (speed, quality selection)
- Resume from last position
- Offline download for mobile

**Technology Options:**
- Cloudflare Stream
- Vimeo API
- AWS MediaConvert + CloudFront
- Self-hosted with FFmpeg + HLS

**Database Schema:**
```sql
VideoStreams Table:
- id
- lesson_id (FK)
- video_url (original)
- hls_manifest_url
- resolutions (JSON: [360p, 720p, 1080p])
- duration_seconds
- thumbnail_url
- subtitles (JSON)
- processing_status
- created_at
```

#### 1.2 **Live Streaming Service** ⭐ MEDIUM PRIORITY
**Purpose:** Live classes, webinars, workshops

**Required Features:**
- Real-time video broadcasting
- Low latency streaming (<3 seconds)
- Recording of live sessions
- Live chat during streams
- Screen sharing
- Whiteboard integration
- Q&A session management
- Attendee limit controls
- Scheduled live events

**Technology Options:**
- Twilio Live
- Agora.io
- AWS IVS (Interactive Video Service)
- WebRTC-based solution

**Database Schema:**
```sql
LiveSessions Table:
- id
- course_id (FK)
- instructor_id (FK)
- scheduled_at
- started_at, ended_at
- stream_url
- recording_url
- max_attendees
- status (scheduled, live, ended, cancelled)

LiveAttendees Table:
- id
- session_id (FK)
- user_id (FK)
- joined_at, left_at
- watch_duration_seconds
```

#### 1.3 **Audio Streaming Service** ⭐ MEDIUM PRIORITY
**Purpose:** Audio-only courses, podcasts, language learning

**Required Features:**
- Audio transcoding (MP3, AAC)
- Variable bitrate streaming
- Background playback
- Playback speed control
- Bookmarks and notes

---

### Category 2: Real-Time Communication

#### 2.1 **Chat Service** ⭐ HIGH PRIORITY
**Purpose:** Student-instructor communication, peer discussions

**Required Features:**
- One-on-one messaging
- Group chats (course-based)
- Real-time message delivery (WebSockets)
- Message read receipts
- File sharing in chat
- Emoji reactions
- Message search
- Typing indicators
- Online/offline status

**Technology:**
- WebSocket connections
- Redis Pub/Sub for message distribution
- Message queue for offline delivery

**Database Schema:**
```sql
Conversations Table:
- id
- type (direct, group, course)
- course_id (nullable)
- created_at

ConversationParticipants Table:
- conversation_id (FK)
- user_id (FK)
- joined_at
- last_read_at

Messages Table:
- id
- conversation_id (FK)
- sender_id (FK)
- content (text)
- attachments (JSON)
- sent_at
- edited_at
- deleted_at
```

#### 2.2 **Video Conferencing Service** ⭐ MEDIUM PRIORITY
**Purpose:** One-on-one tutoring, office hours

**Required Features:**
- Peer-to-peer video calls
- Screen sharing
- Recording capability
- Calendar scheduling
- Waiting room
- Breakout rooms (for group sessions)

**Integration Options:**
- Zoom API
- Google Meet API
- Twilio Video
- Jitsi (open-source)

#### 2.3 **Discussion Forum Service** ⭐ HIGH PRIORITY
**Purpose:** Community discussions, Q&A, peer learning

**Required Features:**
- Thread-based discussions
- Upvote/downvote
- Best answer marking
- Categories and tags
- Search functionality
- Moderation tools
- User reputation system

**Database Schema:**
```sql
ForumPosts Table:
- id
- course_id (FK)
- author_id (FK)
- parent_post_id (for replies)
- title, content
- upvotes, downvotes
- is_pinned, is_locked
- created_at

PostReactions Table:
- post_id (FK)
- user_id (FK)
- reaction_type (upvote, downvote, helpful)
```

---

### Category 3: Analytics & Intelligence

#### 3.1 **Analytics Service** ⭐ HIGH PRIORITY
**Purpose:** Track user behavior, course performance

**Required Features:**
- User activity tracking
- Course engagement metrics
- Conversion funnel analysis
- Cohort analysis
- Revenue analytics
- Real-time dashboards
- Custom reports
- Data export (CSV, PDF)

**Metrics to Track:**
```
User Metrics:
- Daily/Monthly Active Users (DAU/MAU)
- User retention rate
- Session duration
- Pages per session

Course Metrics:
- Course views
- Enrollment rate
- Completion rate
- Drop-off points (which lessons)
- Average rating
- Revenue per course

Instructor Metrics:
- Total students
- Total revenue
- Course popularity
- Student satisfaction
```

**Database Schema:**
```sql
UserEvents Table:
- id
- user_id (FK)
- event_type (page_view, video_watch, quiz_attempt)
- event_data (JSON)
- timestamp
- session_id
```

#### 3.2 **Recommendation Engine** ⭐ MEDIUM PRIORITY
**Purpose:** Personalized course recommendations

**Required Features:**
- Collaborative filtering (users who bought X also bought Y)
- Content-based filtering (based on user's completed courses)
- Trending courses
- "Continue where you left off"
- Suggested learning paths
- Personalized homepage

**Algorithm Types:**
- Item-based collaborative filtering
- User-based collaborative filtering
- Content similarity (tags, categories)
- Popularity + recency scoring

#### 3.3 **A/B Testing Service** ⭐ LOW PRIORITY
**Purpose:** Test features, UI changes, pricing

**Required Features:**
- Variant assignment (random or targeted)
- Metric tracking per variant
- Statistical significance calculation
- Automated winner selection

---

### Category 4: Social & Community Features

#### 4.1 **Social Features Service** ⭐ MEDIUM PRIORITY

**Required Features:**
- User profiles (public)
- Follow/followers system
- Activity feed (course completions, achievements)
- Course sharing (social media)
- Comments on lessons
- Likes/reactions
- User-generated content (notes, resources)

**Database Schema:**
```sql
UserFollows Table:
- follower_id (FK → Users)
- following_id (FK → Users)
- created_at

LessonComments Table:
- id
- lesson_id (FK)
- user_id (FK)
- parent_comment_id (for replies)
- content
- likes_count
- created_at
```

#### 4.2 **Study Groups Service** ⭐ MEDIUM PRIORITY
**Purpose:** Collaborative learning

**Required Features:**
- Create/join study groups
- Group chat
- Shared resources
- Group projects
- Group leaderboards

---

### Category 5: Advanced Learning Features

#### 5.1 **Adaptive Learning Service** ⭐ MEDIUM PRIORITY
**Purpose:** Personalized learning paths

**Required Features:**
- Pre-assessment to gauge skill level
- Difficulty adjustment based on performance
- Skill gap identification
- Personalized content recommendations
- Mastery-based progression

#### 5.2 **Content Moderation Service** ⭐ HIGH PRIORITY
**Purpose:** Review and approve user-generated content

**Required Features:**
- Automated content scanning (profanity, spam)
- Manual review queue
- Approval workflow
- Content flagging system
- DMCA compliance
- Plagiarism detection

**Database Schema:**
```sql
ModerationQueue Table:
- id
- content_type (course, comment, forum_post)
- content_id
- status (pending, approved, rejected)
- flagged_reason
- reviewer_id (FK → Users)
- reviewed_at
```

#### 5.3 **Assignment Submission Service** ⭐ HIGH PRIORITY
**Purpose:** Handle file uploads for assignments

**Required Features:**
- File upload (documents, code, videos)
- Version control for resubmissions
- Plagiarism checking
- Automated grading (for code assignments)
- Peer review assignments
- Rubric-based grading

**Database Schema:**
```sql
AssignmentSubmissions Table:
- id
- assignment_id (FK)
- student_id (FK)
- version_number
- file_urls (JSON)
- submitted_at
- grade
- feedback (text)
- graded_at, graded_by
```

#### 5.4 **Code Execution Service** ⭐ MEDIUM PRIORITY
**Purpose:** For programming courses

**Required Features:**
- Browser-based code editor
- Multi-language support (Python, JavaScript, Java, C++)
- Code execution in sandboxed environment
- Unit test runner
- Code linting and formatting
- Auto-save and version history

**Technology:**
- Monaco Editor (VS Code editor in browser)
- Judge0 API or similar for code execution
- Docker containers for sandboxing

#### 5.5 **Interactive Content Service** ⭐ MEDIUM PRIORITY
**Purpose:** Engaging learning experiences

**Required Features:**
- Drag-and-drop exercises
- Fill-in-the-blank questions
- Matching games
- Simulations
- 3D models (for science courses)
- Virtual labs

---

### Category 6: E-Commerce & Marketing

#### 6.1 **Shopping Cart Service** ⭐ HIGH PRIORITY
**Purpose:** Purchase multiple courses at once

**Required Features:**
- Add/remove courses to cart
- Persistent cart (saved to database)
- Quantity (for bulk purchases/licenses)
- Promo code application
- Cart abandonment tracking
- Checkout flow

**Database Schema:**
```sql
ShoppingCarts Table:
- id
- user_id (FK)
- created_at, updated_at

CartItems Table:
- id
- cart_id (FK)
- course_id (FK)
- quantity
- price_at_add
- added_at
```

#### 6.2 **Coupon/Discount Service** ⭐ HIGH PRIORITY
**Purpose:** Promotions and discounts

**Required Features:**
- Coupon code generation
- Discount types (percentage, flat amount)
- Expiration dates
- Usage limits (one-time, multi-use)
- Minimum purchase amount
- Category/course restrictions
- Bulk coupon generation

**Database Schema:**
```sql
Coupons Table:
- id
- code (unique)
- discount_type (percentage, fixed)
- discount_value
- min_purchase_amount
- max_uses, used_count
- valid_from, valid_until
- applicable_courses (JSON)
- created_by (FK → Users)
```

#### 6.3 **Wishlist Service** ⭐ MEDIUM PRIORITY
**Purpose:** Save courses for later

**Required Features:**
- Add/remove from wishlist
- Price drop notifications
- Share wishlist
- Convert to cart

#### 6.4 **Affiliate Marketing Service** ⭐ MEDIUM PRIORITY
**Purpose:** Referral and affiliate programs

**Required Features:**
- Affiliate link generation
- Click tracking
- Commission calculation
- Payout management
- Affiliate dashboard

**Database Schema:**
```sql
Affiliates Table:
- id
- user_id (FK)
- affiliate_code (unique)
- commission_rate
- total_earnings
- payout_status

AffiliateReferrals Table:
- id
- affiliate_id (FK)
- referred_user_id (FK)
- course_id (FK)
- commission_amount
- created_at
```

#### 6.5 **Gift Card Service** ⭐ LOW PRIORITY
**Purpose:** Gift courses to others

**Required Features:**
- Gift card purchase
- Code generation
- Redemption workflow
- Balance tracking

---

### Category 7: Instructor Tools

#### 7.1 **Instructor Dashboard Service** ⭐ HIGH PRIORITY
**Purpose:** Centralized instructor controls

**Required Features:**
- Course analytics (enrollment, completion, revenue)
- Student management
- Announcement creation
- Q&A management
- Review responses
- Earnings reports
- Payout requests

#### 7.2 **Course Builder Service** ⭐ HIGH PRIORITY
**Purpose:** Enhanced course creation

**Required Features:**
- Drag-and-drop curriculum builder
- Bulk upload lessons
- Course templates
- Preview mode
- Collaboration (co-instructors)
- Version history
- Import/export courses

#### 7.3 **Quiz Builder Service** ⭐ MEDIUM PRIORITY
**Purpose:** Advanced assessment creation

**Required Features:**
- Question bank
- Random question selection
- Question types (multiple choice, true/false, essay, code)
- Image/video in questions
- Time limits per question
- Adaptive difficulty

---

### Category 8: Student Experience

#### 8.1 **Learning Path Service** ⭐ MEDIUM PRIORITY
**Purpose:** Guided learning journeys

**Required Features:**
- Create learning paths (series of courses)
- Prerequisites and dependencies
- Progress tracking across path
- Path completion certificates
- Recommended paths based on career goals

**Database Schema:**
```sql
LearningPaths Table:
- id
- title, description
- category
- estimated_duration_hours
- created_by (FK → Users)

LearningPathCourses Table:
- path_id (FK)
- course_id (FK)
- order
- is_required
- prerequisites (JSON: course_ids)
```

#### 8.2 **Note-Taking Service** ⭐ MEDIUM PRIORITY
**Purpose:** Take notes during lessons

**Required Features:**
- Timestamped notes (for videos)
- Rich text editor
- Tagging and organization
- Search within notes
- Share notes with peers
- Download notes as PDF

**Database Schema:**
```sql
UserNotes Table:
- id
- user_id (FK)
- lesson_id (FK)
- content (rich text)
- timestamp_seconds (for video notes)
- tags (array)
- created_at, updated_at
```

#### 8.3 **Bookmark Service** ⭐ LOW PRIORITY
**Purpose:** Bookmark lessons and resources

**Required Features:**
- Bookmark lessons
- Bookmark specific timestamps in videos
- Organize with folders
- Quick access to bookmarks

#### 8.4 **Calendar/Schedule Service** ⭐ MEDIUM PRIORITY
**Purpose:** Study scheduling and reminders

**Required Features:**
- Add courses to calendar
- Study session scheduling
- Deadline reminders
- Live class scheduling
- Sync with external calendars (Google, Outlook)

---

### Category 9: Admin & Support

#### 9.1 **Admin Panel Service** ⭐ HIGH PRIORITY
**Purpose:** Platform administration

**Required Features:**
- User management (suspend, ban, verify)
- Course approval workflow
- Content moderation
- Payment dispute resolution
- Platform analytics
- System configuration
- Feature flags management
- Email template editor

#### 9.2 **Help Desk / Support Ticket System** ⭐ HIGH PRIORITY
**Purpose:** Customer support

**Required Features:**
- Ticket creation (from users)
- Ticket assignment to support agents
- Priority levels
- Status tracking (open, in-progress, resolved, closed)
- Canned responses
- SLA tracking
- Knowledge base integration

**Database Schema:**
```sql
SupportTickets Table:
- id
- user_id (FK)
- subject, description
- priority (low, medium, high, urgent)
- status (open, in_progress, resolved, closed)
- assigned_to (FK → Users)
- category (billing, technical, course_content)
- created_at, resolved_at

TicketMessages Table:
- id
- ticket_id (FK)
- author_id (FK)
- message
- is_internal (for agent notes)
- created_at
```

#### 9.3 **Knowledge Base / FAQ Service** ⭐ MEDIUM PRIORITY
**Purpose:** Self-service help articles

**Required Features:**
- Article creation and categorization
- Search functionality
- Related articles
- Helpful/not helpful voting
- Multi-language support

#### 9.4 **Reporting Service** ⭐ MEDIUM PRIORITY
**Purpose:** Abuse reporting

**Required Features:**
- Report inappropriate content
- Report copyright infringement
- Report spam/scam courses
- Admin review workflow

---

### Category 10: Infrastructure & DevOps

#### 10.1 **Service Registry/Discovery** ⭐ HIGH PRIORITY
**Purpose:** Dynamic service discovery

**Current Gap:** Hardcoded service URLs

**Required Features:**
- Service registration
- Health checking
- Load balancing
- Failover

**Technology:**
- Consul
- Eureka
- etcd

#### 10.2 **Configuration Management Service** ⭐ HIGH PRIORITY
**Purpose:** Centralized configuration

**Required Features:**
- Environment-specific configs
- Secret management
- Dynamic configuration updates
- Version control for configs

**Technology:**
- HashiCorp Vault
- AWS Secrets Manager
- Config Server (Spring Cloud)

#### 10.3 **Logging Aggregation Service** ⭐ HIGH PRIORITY
**Purpose:** Centralized logging

**Current Gap:** Logs scattered across services

**Required Features:**
- Log collection from all services
- Log parsing and indexing
- Full-text search
- Log retention policies
- Alerts on errors

**Technology:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- Datadog

#### 10.4 **Metrics Collection Service** ⭐ HIGH PRIORITY
**Purpose:** System monitoring

**Required Features:**
- Custom metric collection
- Time-series database
- Dashboards
- Alerting rules

**Technology:**
- Prometheus + Grafana
- New Relic
- Datadog

#### 10.5 **API Rate Limiter Service** ⭐ MEDIUM PRIORITY
**Purpose:** Advanced rate limiting

**Current:** Basic rate limiting in API Gateway

**Enhanced Features:**
- User-based limits
- Endpoint-based limits
- Dynamic rate limits
- Burst allowance
- Rate limit headers

---

### Category 11: Compliance & Security

#### 11.1 **Audit Log Service** ⭐ HIGH PRIORITY
**Purpose:** Track all sensitive actions

**Required Features:**
- Log all CRUD operations
- User action tracking
- Admin action tracking
- Immutable audit trail
- Compliance reports (GDPR, SOC 2)

**Database Schema:**
```sql
AuditLogs Table:
- id
- user_id (FK)
- action (create, update, delete, login, logout)
- resource_type (user, course, payment)
- resource_id
- old_value (JSON)
- new_value (JSON)
- ip_address
- user_agent
- timestamp
```

#### 11.2 **GDPR Compliance Service** ⭐ HIGH PRIORITY
**Purpose:** Data privacy compliance

**Required Features:**
- Data export (all user data)
- Right to be forgotten (data deletion)
- Consent management
- Cookie consent
- Privacy policy acceptance tracking
- Data retention policies

#### 11.3 **Multi-Factor Authentication (MFA) Service** ⭐ MEDIUM PRIORITY
**Purpose:** Enhanced security

**Required Features:**
- TOTP (Time-based One-Time Password)
- SMS-based OTP
- Email-based OTP
- Backup codes
- Trusted devices

#### 11.4 **IP Whitelisting / Geoblocking Service** ⭐ LOW PRIORITY
**Purpose:** Access control

**Required Features:**
- IP whitelisting for enterprise clients
- Geographic restrictions for content licensing
- VPN detection

---

### Category 12: Localization & Accessibility

#### 12.1 **Multi-Language / Localization Service** ⭐ MEDIUM PRIORITY
**Purpose:** Support multiple languages

**Required Features:**
- UI translation
- Course content translation
- Auto-translation
- Language detection
- RTL (right-to-left) support

**Database Schema:**
```sql
Translations Table:
- id
- key (e.g., 'course.title')
- language_code (en, es, fr, de)
- translated_text
- updated_at
```

#### 12.2 **Accessibility Service** ⭐ MEDIUM PRIORITY
**Purpose:** WCAG compliance

**Required Features:**
- Screen reader support
- Keyboard navigation
- High contrast mode
- Font size adjustment
- Closed captions for videos
- Audio descriptions
- Alternative text for images

---

### Category 13: Advanced Features

#### 13.1 **Webhook Service** ⭐ MEDIUM PRIORITY
**Purpose:** Integrate with external systems

**Required Features:**
- Webhook URL registration
- Event subscription
- Retry logic
- Webhook signature verification
- Delivery logs

**Events:**
- user.created
- course.purchased
- course.completed
- payment.received

#### 13.2 **API Marketplace Service** ⭐ LOW PRIORITY
**Purpose:** Public API for third-party developers

**Required Features:**
- API key generation
- Usage tracking
- Rate limiting per API key
- API documentation
- Developer portal

#### 13.3 **White Label / Multi-Tenancy Service** ⭐ LOW PRIORITY
**Purpose:** Enterprise clients with branded platforms

**Required Features:**
- Custom domains
- Custom branding (logo, colors)
- Isolated data per tenant
- Tenant-specific configurations

#### 13.4 **Offline Support Service** ⭐ MEDIUM PRIORITY
**Purpose:** Mobile app offline access

**Required Features:**
- Download courses for offline viewing
- Sync progress when online
- Offline quiz taking
- Cache management

---

## Priority Summary

### 🔴 CRITICAL (Must Have)

1. **Video Streaming Service** - Core feature for e-learning
2. **Chat Service** - Real-time communication
3. **Analytics Service** - Business intelligence
4. **Discussion Forum** - Community engagement
5. **Content Moderation** - Quality control
6. **Assignment Submission** - Essential for courses
7. **Shopping Cart** - E-commerce
8. **Coupon Service** - Marketing
9. **Instructor Dashboard** - Instructor tools
10. **Admin Panel** - Platform management
11. **Support Ticket System** - Customer support
12. **Service Registry** - Microservices infrastructure
13. **Configuration Management** - DevOps
14. **Logging Aggregation** - Debugging
15. **Metrics Collection** - Monitoring
16. **Audit Log** - Compliance
17. **GDPR Compliance** - Legal requirement

### 🟡 HIGH PRIORITY (Should Have)

1. Live Streaming Service
2. Recommendation Engine
3. Social Features
4. Course Builder
5. Learning Path Service
6. Knowledge Base

### 🟢 MEDIUM PRIORITY (Nice to Have)

1. Video Conferencing
2. A/B Testing
3. Study Groups
4. Adaptive Learning
5. Code Execution
6. Interactive Content
7. Wishlist
8. Affiliate Marketing
9. Quiz Builder
10. Note-Taking
11. Calendar/Schedule
12. MFA
13. Multi-Language
14. Accessibility
15. Offline Support
16. Webhook Service

### ⚪ LOW PRIORITY (Future Consideration)

1. Gift Cards
2. Bookmark Service
3. API Marketplace
4. White Label/Multi-Tenancy
5. IP Whitelisting

---

## Implementation Roadmap

### Phase 1: Critical Infrastructure (Month 1-2)
- Video Streaming Service
- Logging Aggregation
- Metrics Collection
- Service Registry
- Configuration Management

### Phase 2: Core Features (Month 3-4)
- Chat Service
- Discussion Forum
- Analytics Service
- Content Moderation
- Assignment Submission

### Phase 3: E-Commerce (Month 5-6)
- Shopping Cart
- Coupon Service
- Wishlist
- Affiliate Marketing

### Phase 4: Instructor Tools (Month 7-8)
- Instructor Dashboard
- Course Builder
- Quiz Builder

### Phase 5: Advanced Learning (Month 9-10)
- Live Streaming
- Recommendation Engine
- Learning Paths
- Interactive Content

### Phase 6: Compliance & Support (Month 11-12)
- GDPR Compliance
- Audit Logs
- Support Ticket System
- Knowledge Base

---

## Estimated Additional Development Effort

**Total Missing Services:** 40+

**Estimated Development Time:**
- Critical services (17): 6-8 months (with a team of 5-7 developers)
- High priority (6): 3-4 months
- Medium priority (15): 6-8 months
- Low priority (5): 2-3 months

**Total:** 17-23 months for complete implementation

**Estimated Costs:**
- Development: $500,000 - $800,000
- Third-party services: $5,000 - $15,000/month
- Infrastructure: Additional $1,000 - $3,000/month

---

## Recommended Third-Party Integrations

Instead of building from scratch, consider these integrations:

1. **Video Streaming:** Vimeo, Cloudflare Stream, AWS MediaConvert
2. **Live Streaming:** Agora.io, Twilio Live, AWS IVS
3. **Video Conferencing:** Zoom API, Google Meet API
4. **Chat:** SendBird, Stream Chat, Pusher Chatkit
5. **Analytics:** Mixpanel, Amplitude, Segment
6. **Help Desk:** Zendesk, Freshdesk, Intercom
7. **Email:** SendGrid, Mailgun, AWS SES
8. **Payment:** Stripe (already integrated)
9. **Code Execution:** Judge0 API, Sphere Engine

---

## Conclusion

The current architecture has **13 core services**, but a comprehensive e-learning platform requires **53+ services/components**.

**Key Missing Areas:**
1. ❌ Video streaming and live classes (CRITICAL)
2. ❌ Real-time communication (chat, forums)
3. ❌ Advanced analytics and recommendations
4. ❌ Instructor tooling
5. ❌ E-commerce features (cart, coupons, wishlist)
6. ❌ Content moderation and compliance
7. ❌ Student engagement features (social, gamification enhancements)
8. ❌ Infrastructure services (logging, metrics, service discovery)
9. ❌ Admin and support tools

**Recommendation:** Prioritize the 17 critical services first, then progressively add high and medium priority features based on user feedback and business needs.
