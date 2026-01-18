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
    constructor(private readonly forumService: ForumService) { }

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
