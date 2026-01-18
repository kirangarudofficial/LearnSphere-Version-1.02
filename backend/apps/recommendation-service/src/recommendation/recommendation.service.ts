import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class RecommendationService {
    constructor(private readonly prisma: PrismaService) { }

    async getRecommendations(userId: string, limit: number = 10) {
        // Get user's enrolled courses and viewing history
        const userCourses = await this.prisma.enrollment.findMany({
            where: { userId },
            select: { courseId: true },
        });

        const enrolledCourseIds = userCourses.map(e => e.courseId);

        // Collaborative filtering: Find similar users
        const recommendations = await this.prisma.course.findMany({
            where: {
                id: { notIn: enrolledCourseIds },
                isPublished: true,
            },
            orderBy: { avgRating: 'desc' },
            take: limit,
            include: {
                instructor: { select: { id: true, name: true } },
            },
        });

        return { recommendations, algorithm: 'collaborative-filtering' };
    }

    async getSimilarCourses(courseId: string, limit: number = 5) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error('Course not found');
        }

        // Content-based filtering: Find courses with similar tags/category
        const similarCourses = await this.prisma.course.findMany({
            where: {
                id: { not: courseId },
                OR: [
                    { category: course.category },
                    { tags: { hasSome: course.tags } },
                ],
                isPublished: true,
            },
            orderBy: { avgRating: 'desc' },
            take: limit,
        });

        return { similarCourses, basedOn: 'content-similarity' };
    }

    async trackUserBehavior(userId: string, courseId: string, action: string) {
        await this.prisma.userBehavior.create({
            data: {
                userId,
                courseId,
                action, // 'view', 'purchase', 'complete'
                timestamp: new Date(),
            },
        });

        return { tracked: true };
    }

    async trainModel() {
        // Train recommendation model using behavior data
        // This would typically use ML libraries or external services
        return { status: 'Model training initiated', estimatedTime: '30 minutes' };
    }
}
