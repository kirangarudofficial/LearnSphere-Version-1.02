import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StreamingService } from './streaming.service';
import { GetStreamDto } from './dto/get-stream.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Video Streaming')
@Controller('streaming')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StreamingController {
    constructor(private readonly streamingService: StreamingService) { }

    @Get('lesson/:lessonId')
    @ApiOperation({ summary: 'Get video stream for lesson' })
    async getStream(
        @Param('lessonId') lessonId: string,
        @CurrentUser('sub') userId: string,
        @Query() dto: GetStreamDto,
    ) {
        return this.streamingService.getStream(lessonId, userId, dto);
    }

    @Post('progress/:videoStreamId')
    @ApiOperation({ summary: 'Update viewing progress' })
    async updateProgress(
        @Param('videoStreamId') videoStreamId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: UpdateProgressDto,
    ) {
        return this.streamingService.updateProgress(userId, videoStreamId, dto);
    }

    @Get('analytics/:videoStreamId')
    @ApiOperation({ summary: 'Get video analytics' })
    async getAnalytics(@Param('videoStreamId') videoStreamId: string) {
        return this.streamingService.getAnalytics(videoStreamId);
    }
}
