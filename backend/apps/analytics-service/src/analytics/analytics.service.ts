import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { TrackEventDto } from './dto/track-event.dto';

@Injectable()
export class AnalyticsService {
    private readonly logger = new Logger(AnalyticsService.name);

    constructor(private readonly prisma: PrismaService) { }

    async trackEvent(dto: TrackEventDto) {
        const event = await this.prisma.userEvent.create({
            data: {
                userId: dto.userId,
                eventType: dto.eventType,
                eventData: dto.eventData,
                sessionId: dto.sessionId,
            },
        });

        this.logger.log(`Event tracked: ${dto.eventType} for user ${dto.userId}`);

        // Process event for real-time metrics (async)
        this.processEventAsync(event).catch(console.error);

        return event;
    }

    async getUserAnalytics(userId: string, startDate?: Date, endDate?: Date) {
        const where: any = { userId };

        if (startDate || endDate) {
            where.timestamp = {};
            if (startDate) where.timestamp.gte = startDate;
            if (endDate) where.timestamp.lte = endDate;
        }

        // Event counts by type
        const eventCounts = await this.prisma.userEvent.groupBy({
            by: ['eventType'],
            where,
            _count: true,
        });

        // Recent events
        const recentEvents = await this.prisma.userEvent.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: 50,
        });

        // Total events
        const totalEvents = await this.prisma.userEvent.count({ where });

        return {
            userId,
            totalEvents,
            eventCounts: eventCounts.map((e) => ({
                eventType: e.eventType,
                count: e._count,
            })),
            recentEvents,
        };
    }

    async getCourseAnalytics(courseId: string, startDate: Date, endDate: Date) {
        const metrics = await this.prisma.courseMetrics.findMany({
            where: {
                courseId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { date: 'asc' },
        });

        const totals = metrics.reduce(
            (acc, m) => ({
                totalViews: acc.totalViews + m.views,
                totalEnrollments: acc.totalEnrollments + m.enrollments,
                totalCompletions: acc.totalCompletions + m.completions,
                totalRevenue: acc.totalRevenue + Number(m.revenue),
            }),
            { totalViews: 0, totalEnrollments: 0, totalCompletions: 0, totalRevenue: 0 },
        );

        return {
            courseId,
            dateRange: { start: startDate, end: endDate },
            metrics,
            totals,
        };
    }

    async getDashboardMetrics() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Today's events
        const todayEvents = await this.prisma.userEvent.count({
            where: {
                timestamp: {
                    gte: today,
                },
            },
        });

        // Unique users today
        const uniqueUsersToday = await this.prisma.userEvent.findMany({
            where: {
                timestamp: {
                    gte: today,
                },
            },
            distinct: ['userId'],
            select: { userId: true },
        });

        // Top events today
        const topEvents = await this.prisma.userEvent.groupBy({
            by: ['eventType'],
            where: {
                timestamp: {
                    gte: today,
                },
            },
            _count: true,
            orderBy: {
                _count: {
                    eventType: 'desc',
                },
            },
            take: 10,
        });

        return {
            date: today,
            totalEvents: todayEvents,
            uniqueUsers: uniqueUsersToday.length,
            topEvents: topEvents.map((e) => ({
                eventType: e.eventType,
                count: e._count,
            })),
        };
    }

    private async processEventAsync(event: any) {
        // Update real-time metrics, aggregate data, trigger alerts, etc.
        this.logger.debug(`Processing event async: ${event.id}`);
    }
}
