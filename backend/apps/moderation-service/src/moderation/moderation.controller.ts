import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ModerationService } from './moderation.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Moderation')
@Controller('moderation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ModerationController {
    constructor(private readonly moderationService: ModerationService) { }

    @Post('flags')
    async flagContent(
        @CurrentUser('sub') userId: string,
        @Body() dto: { contentId: string; contentType: string; reason: string },
    ) {
        return this.moderationService.flagContent(dto.contentId, dto.contentType, userId, dto.reason);
    }

    @Patch('flags/:id/review')
    async reviewFlag(
        @Param('id') id: string,
        @CurrentUser('sub') moderatorId: string,
        @Body() dto: { decision: string; notes: string },
    ) {
        return this.moderationService.reviewFlag(id, moderatorId, dto.decision, dto.notes);
    }

    @Get('flags/pending')
    async getPendingFlags() {
        return this.moderationService.getPendingFlags();
    }

    @Post('bans')
    async banUser(@Body() dto: { userId: string; reason: string; duration: number }) {
        return this.moderationService.banUser(dto.userId, dto.reason, dto.duration);
    }
}
