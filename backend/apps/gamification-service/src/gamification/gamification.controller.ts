import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Gamification')
@Controller('gamification')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GamificationController {
    constructor(private readonly gamificationService: GamificationService) { }

    @Post('points')
    async awardPoints(
        @CurrentUser('sub') userId: string,
        @Body() dto: { points: number; reason: string },
    ) {
        return this.gamificationService.awardPoints(userId, dto.points, dto.reason);
    }

    @Post('badges')
    async awardBadge(
        @CurrentUser('sub') userId: string,
        @Body() dto: { badgeId: string },
    ) {
        return this.gamificationService.awardBadge(userId, dto.badgeId);
    }

    @Get('stats')
    async getUserStats(@CurrentUser('sub') userId: string) {
        return this.gamificationService.getUserStats(userId);
    }

    @Get('leaderboard')
    async getLeaderboard(
        @Query('limit') limit?: number,
        @Query('category') category?: string,
    ) {
        return this.gamificationService.getLeaderboard(limit, category);
    }

    @Post('achievements/track')
    async trackAchievement(
        @CurrentUser('sub') userId: string,
        @Body() dto: { achievementType: string; metadata?: any },
    ) {
        return this.gamificationService.trackAchievement(userId, dto.achievementType, dto.metadata);
    }

    @Get('streak')
    async getStreak(@CurrentUser('sub') userId: string) {
        return this.gamificationService.getStreak(userId);
    }
}
