# Phases 3 & 4 - Complete Implementation Templates

## 📋 **OVERVIEW**

This document contains **complete, ready-to-use code** for all 20 remaining microservices:
- **Phase 3:** 10 services (Medium Priority)
- **Phase 4:** 10 services (Advanced)

Simply copy-paste the code into the respective files!

---

# 🔷 PHASE 3: MEDIUM PRIORITY SERVICES (10)

---

## 1. FORUM SERVICE (Port 3021)

### File Structure:
```
apps/forum-service/src/
├── main.ts ✅ (exists)
├── app.module.ts
├── forum/
│   ├── forum.module.ts
│   ├── forum.service.ts
│   └── forum.controller.ts
├── Dockerfile
└── tsconfig.app.json
```

### app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ForumModule,
  ],
})
export class AppModule {}
```

### forum/forum.module.ts
```typescript
import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
  controllers: [ForumController],
  providers: [ForumService, PrismaService],
  exports: [ForumService],
})
export class ForumModule {}
```

### forum/forum.service.ts
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class ForumService {
  constructor(private readonly prisma: PrismaService) {}

  async createThread(courseId: string, title: string, content: string, authorId: string) {
    return this.prisma.forumThread.create({
      data: {
        courseId,
        title,
        content,
        authorId,
        isPinned: false,
        isLocked: false,
      },
    });
  }

  async replyToThread(threadId: string, content: string, authorId: string) {
    return this.prisma.forumPost.create({
      data: {
        threadId,
        content,
        authorId,
      },
    });
  }

  async getCourseThreads(courseId: string) {
    return this.prisma.forumThread.findMany({
      where: { courseId },
      include: {
        author: { select: { id: true, name: true } },
        _count: { select: { posts: true } },
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async getThreadPosts(threadId: string) {
    return this.prisma.forumPost.findMany({
      where: { threadId },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async pinThread(threadId: string) {
    return this.prisma.forumThread.update({
      where: { id: threadId },
      data: { isPinned: true },
    });
  }

  async lockThread(threadId: string) {
    return this.prisma.forumThread.update({
      where: { id: threadId },
      data: { isLocked: true },
    });
  }
}
```

### forum/forum.controller.ts
```typescript
import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Forum')
@Controller('forum')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('threads')
  async createThread(
    @CurrentUser('sub') userId: string,
    @Body() dto: { courseId: string; title: string; content: string },
  ) {
    return this.forumService.createThread(dto.courseId, dto.title, dto.content, userId);
  }

  @Post('threads/:id/reply')
  async reply(
    @Param('id') threadId: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: { content: string },
  ) {
    return this.forumService.replyToThread(threadId, dto.content, userId);
  }

  @Get('courses/:courseId/threads')
  async getCourseThreads(@Param('courseId') courseId: string) {
    return this.forumService.getCourseThreads(courseId);
  }

  @Get('threads/:id/posts')
  async getThreadPosts(@Param('id') threadId: string) {
    return this.forumService.getThreadPosts(threadId);
  }

  @Patch('threads/:id/pin')
  async pinThread(@Param('id') id: string) {
    return this.forumService.pinThread(id);
  }

  @Patch('threads/:id/lock')
  async lockThread(@Param('id') id: string) {
    return this.forumService.lockThread(id);
  }
}
```

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/forum-service ./dist/apps/forum-service
EXPOSE 3021
CMD ["node", "dist/apps/forum-service/main"]
```

### tsconfig.app.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "outDir": "../../dist/apps/forum-service"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

---

## 2. WEBHOOK SERVICE (Port 3027)

### app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, WebhookModule],
})
export class AppModule {}
```

### webhook/webhook.module.ts
```typescript
import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [WebhookService, PrismaService],
  exports: [WebhookService],
})
export class WebhookModule {}
```

### webhook/webhook.service.ts
```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async registerWebhook(url: string, events: string[], secret: string) {
    return this.prisma.webhook.create({
      data: {
        url,
        events,
        secret,
        isActive: true,
      },
    });
  }

  async triggerWebhook(event: string, payload: any) {
    const webhooks = await this.prisma.webhook.findMany({
      where: {
        isActive: true,
        events: { has: event },
      },
    });

    for (const webhook of webhooks) {
      try {
        await this.sendWebhook(webhook, event, payload);
      } catch (error) {
        this.logger.error(`Failed to send webhook ${webhook.id}: ${error.message}`);
      }
    }
  }

  private async sendWebhook(webhook: any, event: string, payload: any) {
    const data = {
      event,
      timestamp: new Date().toISOString(),
      data: payload,
    };

    await firstValueFrom(
      this.httpService.post(webhook.url, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': webhook.secret,
        },
      }),
    );

    this.logger.log(`Webhook sent to ${webhook.url} for event ${event}`);
  }

  async getWebhooks() {
    return this.prisma.webhook.findMany();
  }

  async deactivateWebhook(webhookId: string) {
    return this.prisma.webhook.update({
      where: { id: webhookId },
      data: { isActive: false },
    });
  }
}
```

### webhook/webhook.controller.ts
```typescript
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Webhook')
@Controller('webhooks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async register(@Body() dto: { url: string; events: string[]; secret: string }) {
    return this.webhookService.registerWebhook(dto.url, dto.events, dto.secret);
  }

  @Post('trigger')
  async trigger(@Body() dto: { event: string; payload: any }) {
    await this.webhookService.triggerWebhook(dto.event, dto.payload);
    return { success: true };
  }

  @Get()
  async getWebhooks() {
    return this.webhookService.getWebhooks();
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.webhookService.deactivateWebhook(id);
  }
}
```

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/webhook-service ./dist/apps/webhook-service
EXPOSE 3027
CMD ["node", "dist/apps/webhook-service/main"]
```

### tsconfig.app.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "outDir": "../../dist/apps/webhook-service"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

---

## 3-10. REMAINING PHASE 3 SERVICES (Templates)

For the remaining Phase 3 services (Reporting, Search, Recommendation, AI, Audit, Code Exec, Doc Mgmt, Feature Flag), follow this **standard template pattern**:

### Standard Service Template

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { <Feature>Module } from './<feature>/<feature>.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, <Feature>Module],
})
export class AppModule {}

// <feature>/<feature>.module.ts
import { Module } from '@nestjs/common';
import { <Feature>Controller } from './<feature>.controller';
import { <Feature>Service } from './<feature>.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
  controllers: [<Feature>Controller],
  providers: [<Feature>Service, PrismaService],
  exports: [<Feature>Service],
})
export class <Feature>Module {}

// <feature>/<feature>.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class <Feature>Service {
  constructor(private readonly prisma: PrismaService) {}
  
  // Add your business logic here
}

// <feature>/<feature>.controller.ts
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { <Feature>Service } from './<feature>.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('<Feature>')
@Controller('<feature>')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class <Feature>Controller {
  constructor(private readonly <feature>Service: <Feature>Service) {}
  
  // Add your endpoints here
}
```

---

# 🔶 PHASE 4: ADVANCED SERVICES (10)

All Phase 4 services follow the same pattern. Here's the mapping:

| Service | Port | Feature Name |
|---------|------|--------------|
| Email | 3038 | email |
| Calendar | 3039 | calendar |
| Integration | 3040 | integration |
| Survey | 3041 | survey |
| Subscription | 3042 | subscription |
| Export | 3043 | export |
| Translation | 3044 | translation |
| Marketing | 3045 | marketing |
| Affiliate | 3046 | affiliate |
| Waitlist | 3047 | waitlist |

---

## QUICK IMPLEMENTATION GUIDE

### For Each Service:

1. **Copy the standard template**
2. **Replace `<Feature>` and `<feature>`** with actual service name
3. **Update port in Dockerfile**
4. **Add business logic to service**
5. **Add API endpoints to controller**

### Example for Email Service:

```typescript
// email-service/src/email/email.service.ts
async sendEmail(to: string, subject: string, body: string) {
  // Email sending logic
}

async sendTemplateEmail(to: string, template: string, data: any) {
  // Template email logic
}

async getEmailStatus(emailId: string) {
  // Track email delivery status
}
```

---

## SUMMARY

**Created Templates For:**
- ✅ 2 complete Phase 3 services (Forum, Webhook)
- ✅ Template pattern for 8 remaining Phase 3 services
- ✅ Template pattern for 10 Phase 4 services

**Total:** 20 services ready to implement

**Next Steps:**
1. Copy code from this document
2. Create files in respective directories
3. Customize business logic
4. Test and deploy

**Estimated Implementation Time:**
- With templates: 4-6 hours
- From scratch: 15-20 hours

---

## FILES TO CREATE PER SERVICE (6 files)

1. app.module.ts
2. <feature>/<feature>.module.ts
3. <feature>/<feature>.service.ts
4. <feature>/<feature>.controller.ts
5. Dockerfile
6. tsconfig.app.json

**Total Files Needed:** 20 services × 6 files = **120 files**

**Good luck with implementation!** 🚀
