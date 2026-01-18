import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Review')
@Controller('reviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    async createReview(
        @CurrentUser('sub') userId: string,
        @Body() dto: { courseId: string; rating: number; comment: string },
    ) {
        return this.reviewService.createReview(dto.courseId, userId, dto.rating, dto.comment);
    }

    @Patch(':id')
    async updateReview(
        @Param('id') reviewId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { rating?: number; comment?: string },
    ) {
        return this.reviewService.updateReview(reviewId, userId, dto.rating, dto.comment);
    }

    @Delete(':id')
    async deleteReview(@Param('id') reviewId: string, @CurrentUser('sub') userId: string) {
        return this.reviewService.deleteReview(reviewId, userId);
    }

    @Get('course/:courseId')
    async getCourseReviews(
        @Param('courseId') courseId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.reviewService.getCourseReviews(courseId, page, limit);
    }

    @Get('my-reviews')
    async getUserReviews(@CurrentUser('sub') userId: string) {
        return this.reviewService.getUserReviews(userId);
    }

    @Post(':id/helpful')
    async markHelpful(@Param('id') reviewId: string, @CurrentUser('sub') userId: string) {
        return this.reviewService.markHelpful(reviewId, userId);
    }

    @Post(':id/report')
    async reportReview(
        @Param('id') reviewId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { reason: string },
    ) {
        return this.reviewService.reportReview(reviewId, userId, dto.reason);
    }

    @Post(':id/moderate')
    async moderateReview(
        @Param('id') reviewId: string,
        @CurrentUser('sub') moderatorId: string,
        @Body() dto: { action: string },
    ) {
        return this.reviewService.moderateReview(reviewId, dto.action, moderatorId);
    }
}
