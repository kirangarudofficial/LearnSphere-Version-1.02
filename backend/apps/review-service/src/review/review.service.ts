import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) { }

    async createReview(courseId: string, userId: string, rating: number, comment: string) {
        // Verify enrollment
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { userId, courseId },
        });

        if (!enrollment) {
            throw new BadRequestException('Must be enrolled to review course');
        }

        // Check for existing review
        const existing = await this.prisma.review.findFirst({
            where: { userId, courseId },
        });

        if (existing) {
            throw new BadRequestException('You have already reviewed this course');
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            throw new BadRequestException('Rating must be between 1 and 5');
        }

        const review = await this.prisma.review.create({
            data: {
                userId,
                courseId,
                rating,
                comment,
                isVerifiedPurchase: true,
            },
        });

        // Update course average rating
        await this.updateCourseRating(courseId);

        return review;
    }

    async updateReview(reviewId: string, userId: string, rating?: number, comment?: string) {
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        if (review.userId !== userId) {
            throw new BadRequestException('Cannot update another user\'s review');
        }

        const updated = await this.prisma.review.update({
            where: { id: reviewId },
            data: {
                ...(rating && { rating }),
                ...(comment && { comment }),
                updatedAt: new Date(),
            },
        });

        await this.updateCourseRating(review.courseId);

        return updated;
    }

    async deleteReview(reviewId: string, userId: string) {
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        if (review.userId !== userId) {
            throw new BadRequestException('Cannot delete another user\'s review');
        }

        await this.prisma.review.delete({ where: { id: reviewId } });

        await this.updateCourseRating(review.courseId);

        return { success: true };
    }

    async getCourseReviews(courseId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [reviews, total, stats] = await Promise.all([
            this.prisma.review.findMany({
                where: { courseId },
                skip,
                take: limit,
                include: {
                    user: { select: { id: true, name: true, avatar: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.review.count({ where: { courseId } }),
            this.getReviewStats(courseId),
        ]);

        return {
            reviews,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            stats,
        };
    }

    async getUserReviews(userId: string) {
        return this.prisma.review.findMany({
            where: { userId },
            include: {
                course: { select: { id: true, title: true, thumbnail: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markHelpful(reviewId: string, userId: string) {
        const existing = await this.prisma.reviewHelpful.findFirst({
            where: { reviewId, userId },
        });

        if (existing) {
            return { success: false, message: 'Already marked as helpful' };
        }

        await this.prisma.reviewHelpful.create({
            data: { reviewId, userId },
        });

        return { success: true };
    }

    async reportReview(reviewId: string, userId: string, reason: string) {
        return this.prisma.reviewReport.create({
            data: {
                reviewId,
                reportedBy: userId,
                reason,
            },
        });
    }

    async moderateReview(reviewId: string, action: string, moderatorId: string) {
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        if (action === 'approve') {
            return this.prisma.review.update({
                where: { id: reviewId },
                data: { isModerated: true, moderatedBy: moderatorId, moderatedAt: new Date() },
            });
        } else if (action === 'hide') {
            return this.prisma.review.update({
                where: { id: reviewId },
                data: { isHidden: true, moderatedBy: moderatorId, moderatedAt: new Date() },
            });
        }

        throw new BadRequestException('Invalid moderation action');
    }

    private async updateCourseRating(courseId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { courseId },
            select: { rating: true },
        });

        if (reviews.length === 0) {
            await this.prisma.course.update({
                where: { id: courseId },
                data: { averageRating: 0, reviewCount: 0 },
            });
            return;
        }

        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await this.prisma.course.update({
            where: { id: courseId },
            data: {
                averageRating: avgRating,
                reviewCount: reviews.length,
            },
        });
    }

    private async getReviewStats(courseId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { courseId },
            select: { rating: true },
        });

        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(r => {
            distribution[r.rating]++;
        });

        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return {
            averageRating: avgRating,
            totalReviews: reviews.length,
            distribution,
        };
    }
}
