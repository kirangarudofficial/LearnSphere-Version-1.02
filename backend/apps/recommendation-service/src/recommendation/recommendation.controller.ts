import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Recommendation')
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RecommendationController {
    constructor(private readonly recommendationService: RecommendationService) { }

    @Get('user/:userId')
    async getRecommendations(
        @Param('userId') userId: string,
        @Query('limit') limit?: number,
    ) {
        return this.recommendationService.getRecommendations(userId, limit ? +limit : 10);
    }

    @Get('course/:courseId/similar')
    async getSimilarCourses(
        @Param('courseId') courseId: string,
        @Query('limit') limit?: number,
    ) {
        return this.recommendationService.getSimilarCourses(courseId, limit ? +limit : 5);
    }

    @Post('track')
    async trackBehavior(
        @CurrentUser('sub') userId: string,
        @Body() dto: { courseId: string; action: string },
    ) {
        return this.recommendationService.trackUserBehavior(userId, dto.courseId, dto.action);
    }

    @Post('train')
    async trainModel() {
        return this.recommendationService.trainModel();
    }
}
