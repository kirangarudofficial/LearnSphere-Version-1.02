import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('track')
    @ApiOperation({ summary: 'Track an event' })
    async trackEvent(@Body() dto: TrackEventDto) {
        return this.analyticsService.trackEvent(dto);
    }

    @Get('users/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user analytics' })
    async getUserAnalytics(
        @Param('userId') userId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.analyticsService.getUserAnalytics(
            userId,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined,
        );
    }

    @Get('courses/:courseId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get course analytics' })
    async getCourseAnalytics(
        @Param('courseId') courseId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.analyticsService.getCourseAnalytics(
            courseId,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('dashboard')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get dashboard metrics' })
    async getDashboardMetrics() {
        return this.analyticsService.getDashboardMetrics();
    }
}
