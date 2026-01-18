import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StreamingService } from './streaming.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Live Streaming')
@Controller('live')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StreamingController {
    constructor(private readonly streamingService: StreamingService) { }

    @Post('sessions')
    async createSession(@Body() dto: { courseId: string; title: string; instructorId: string }) {
        return this.streamingService.createSession(dto.courseId, dto.title, dto.instructorId);
    }

    @Patch('sessions/:id/start')
    async startStream(@Param('id') id: string) {
        return this.streamingService.startStream(id);
    }

    @Patch('sessions/:id/end')
    async endStream(@Param('id') id: string) {
        return this.streamingService.endStream(id);
    }

    @Get('sessions/:id/viewers')
    async getViewers(@Param('id') id: string) {
        const count = await this.streamingService.getViewers(id);
        return { viewerCount: count };
    }
}
