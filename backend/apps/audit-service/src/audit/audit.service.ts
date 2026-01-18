import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class AuditService {
    constructor(private readonly prisma: PrismaService) { }

    async logEvent(
        eventType: string,
        userId: string,
        resourceType: string,
        resourceId: string,
        action: string,
        metadata?: any,
    ) {
        return this.prisma.auditLog.create({
            data: {
                eventType,
                userId,
                resourceType,
                resourceId,
                action,
                metadata,
                ipAddress: metadata?.ipAddress,
                userAgent: metadata?.userAgent,
                timestamp: new Date(),
            },
        });
    }

    async queryLogs(filters: any) {
        const { userId, resourceType, action, startDate, endDate, limit = 100 } = filters;

        return this.prisma.auditLog.findMany({
            where: {
                ...(userId && { userId }),
                ...(resourceType && { resourceType }),
                ...(action && { action }),
                ...(startDate && { timestamp: { gte: new Date(startDate) } }),
                ...(endDate && { timestamp: { lte: new Date(endDate) } }),
            },
            orderBy: { timestamp: 'desc' },
            take: limit,
        });
    }

    async getTimeline(userId: string) {
        return this.prisma.auditLog.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            take: 100,
        });
    }

    async generateAuditReport(startDate: string, endDate: string) {
        const logs = await this.prisma.auditLog.findMany({
            where: {
                timestamp: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });

        const summary = {
            totalEvents: logs.length,
            eventsByType: this.groupBy(logs, 'eventType'),
            eventsByAction: this.groupBy(logs, 'action'),
            topUsers: this.getTopUsers(logs),
        };

        return { summary, logs };
    }

    private groupBy(items: any[], key: string) {
        return items.reduce((acc, item) => {
            const value = item[key];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    private getTopUsers(logs: any[]) {
        const userCounts = this.groupBy(logs, 'userId');
        return Object.entries(userCounts)
            .sort(([, a]: any, [, b]: any) => b - a)
            .slice(0, 10);
    }
}
