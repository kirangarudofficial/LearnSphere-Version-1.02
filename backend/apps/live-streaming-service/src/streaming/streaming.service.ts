import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class StreamingService {
    constructor(private readonly prisma: PrismaService) { }

    async createSession(courseId: string, title: string, instructorId: string) {
        return this.prisma.liveStreamSession.create({
            data: {
                courseId,
                title,
                instructorId,
                status: 'SCHEDULED',
                streamKey: this.generateStreamKey(),
            },
        });
    }

    async startStream(sessionId: string) {
        return this.prisma.liveStreamSession.update({
            where: { id: sessionId },
            data: { status: 'LIVE', startedAt: new Date() },
        });
    }

    async endStream(sessionId: string) {
        return this.prisma.liveStreamSession.update({
            where: { id: sessionId },
            data: { status: 'ENDED', endedAt: new Date() },
        });
    }

    async getViewers(sessionId: string) {
        return this.prisma.liveStreamViewer.count({
            where: { sessionId, leftAt: null },
        });
    }

    private generateStreamKey(): string {
        return `live_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }
}
