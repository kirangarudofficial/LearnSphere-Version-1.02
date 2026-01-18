import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class ModerationService {
    constructor(private readonly prisma: PrismaService) { }

    async flagContent(contentId: string, contentType: string, reportedBy: string, reason: string) {
        return this.prisma.contentFlag.create({
            data: {
                contentId,
                contentType,
                reportedBy,
                reason,
                status: 'PENDING',
            },
        });
    }

    async reviewFlag(flagId: string, moderatorId: string, decision: string, notes: string) {
        return this.prisma.contentFlag.update({
            where: { id: flagId },
            data: {
                status: decision,
                moderatorId,
                moderatorNotes: notes,
                reviewedAt: new Date(),
            },
        });
    }

    async getPendingFlags() {
        return this.prisma.contentFlag.findMany({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'asc' },
        });
    }

    async banUser(userId: string, reason: string, duration: number) {
        return this.prisma.userBan.create({
            data: {
                userId,
                reason,
                bannedUntil: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
            },
        });
    }
}
