import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class SupportService {
    constructor(private readonly prisma: PrismaService) { }

    async createTicket(userId: string, subject: string, description: string, priority: string) {
        return this.prisma.supportTicket.create({
            data: {
                userId,
                subject,
                description,
                priority,
                status: 'OPEN',
            },
        });
    }

    async assignTicket(ticketId: string, agentId: string) {
        return this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: { assignedTo: agentId, status: 'IN_PROGRESS' },
        });
    }

    async resolveTicket(ticketId: string, resolution: string) {
        return this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: {
                status: 'RESOLVED',
                resolution,
                resolvedAt: new Date(),
            },
        });
    }

    async addComment(ticketId: string, userId: string, comment: string) {
        return this.prisma.ticketComment.create({
            data: { ticketId, userId, comment },
        });
    }

    async getUserTickets(userId: string) {
        return this.prisma.supportTicket.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
