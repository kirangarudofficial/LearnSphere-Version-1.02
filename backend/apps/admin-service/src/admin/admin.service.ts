import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) { }

    async getSystemStats() {
        const [totalUsers, totalCourses, totalEnrollments, totalRevenue] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.course.count(),
            this.prisma.enrollment.count(),
            this.prisma.payment.aggregate({ _sum: { amount: true } }),
        ]);

        return {
            totalUsers,
            totalCourses,
            totalEnrollments,
            totalRevenue: totalRevenue._sum.amount || 0,
            timestamp: new Date(),
        };
    }

    async getUsers(page: number = 1, limit: number = 20, filters?: any) {
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                where: filters,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    _count: { select: { enrollments: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where: filters }),
        ]);

        return { users, total, page, limit, pages: Math.ceil(total / limit) };
    }

    async updateUserRole(userId: string, role: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
    }

    async banUser(userId: string, reason: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: true,
                banReason: reason,
                bannedAt: new Date(),
            },
        });
    }

    async unbanUser(userId: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: false,
                banReason: null,
                bannedAt: null,
            },
        });
    }

    async getCourses(page: number = 1, limit: number = 20, filters?: any) {
        const skip = (page - 1) * limit;

        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                skip,
                take: limit,
                where: filters,
                include: {
                    instructor: { select: { id: true, name: true } },
                    _count: { select: { enrollments: true, reviews: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.course.count({ where: filters }),
        ]);

        return { courses, total, page, limit, pages: Math.ceil(total / limit) };
    }

    async approveCourse(courseId: string) {
        return this.prisma.course.update({
            where: { id: courseId },
            data: { status: 'PUBLISHED', publishedAt: new Date() },
        });
    }

    async rejectCourse(courseId: string, reason: string) {
        return this.prisma.course.update({
            where: { id: courseId },
            data: { status: 'REJECTED', rejectionReason: reason },
        });
    }

    async getRevenueReport(startDate: Date, endDate: Date) {
        const payments = await this.prisma.payment.findMany({
            where: {
                createdAt: { gte: startDate, lte: endDate },
                status: 'COMPLETED',
            },
            select: {
                amount: true,
                createdAt: true,
                course: { select: { title: true } },
            },
        });

        const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
        const avgRevenue = totalRevenue / (payments.length || 1);

        return {
            totalRevenue,
            avgRevenue,
            totalTransactions: payments.length,
            startDate,
            endDate,
            payments,
        };
    }

    async getActivityLogs(page: number = 1, limit: number = 50) {
        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            this.prisma.activityLog.findMany({
                skip,
                take: limit,
                include: { user: { select: { id: true, name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.activityLog.count(),
        ]);

        return { logs, total, page, limit, pages: Math.ceil(total / limit) };
    }

    async getSystemHealth() {
        const dbHealth = await this.checkDatabaseHealth();
        const cacheHealth = await this.checkCacheHealth();

        return {
            status: dbHealth && cacheHealth ? 'healthy' : 'degraded',
            database: dbHealth ? 'up' : 'down',
            cache: cacheHealth ? 'up' : 'down',
            timestamp: new Date(),
        };
    }

    private async checkDatabaseHealth(): Promise<boolean> {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return true;
        } catch {
            return false;
        }
    }

    private async checkCacheHealth(): Promise<boolean> {
        // Mock cache check - implement actual Redis check
        return true;
    }
}
