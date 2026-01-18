import { Injectable } from '@restjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class WaitlistService {
    constructor(private readonly prisma: PrismaService) { }

    async joinWaitlist(courseId: string, email: string, userId?: string) {
        return this.prisma.waitlistEntry.create({
            data: { courseId, email, userId, position: await this.getNextPosition(courseId) },
        });
    }

    async notifyAvailable(courseId: string, count: number) {
        const entries = await this.prisma.waitlistEntry.findMany({
            where: { courseId, notifiedAt: null },
            orderBy: { position: 'asc' },
            take: count,
        });

        for (const entry of entries) {
            // Send notification email
            await this.prisma.waitlistEntry.update({
                where: { id: entry.id },
                data: { notifiedAt: new Date() },
            });
        }

        return { notified: entries.length };
    }

    async getPosition(entryId: string) {
        const entry = await this.prisma.waitlistEntry.findUnique({ where: { id: entryId } });
        return { position: entry.position };
    }

    async removeFromWaitlist(entryId: string) {
        return this.prisma.waitlistEntry.delete({ where: { id: entryId } });
    }

    private async getNextPosition(courseId: string): Promise<number> {
        const count = await this.prisma.waitlistEntry.count({ where: { courseId } });
        return count + 1;
    }
}
