import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) { }

    async createConversation(dto: CreateConversationDto, userId: string) {
        const conversation = await this.prisma.conversation.create({
            data: {
                type: dto.type,
                courseId: dto.courseId,
                name: dto.name,
                participants: {
                    create: [
                        { userId },
                        ...dto.participantIds.map((id) => ({ userId: id })),
                    ],
                },
            },
            include: {
                participants: true,
            },
        });

        return conversation;
    }

    async getUserConversations(userId: string) {
        return this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                participants: true,
                messages: {
                    take: 1,
                    orderBy: { sentAt: 'desc' },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async sendMessage(dto: SendMessageDto) {
        const message = await this.prisma.message.create({
            data: {
                conversationId: dto.conversationId,
                senderId: dto.senderId,
                content: dto.content,
                attachments: dto.attachments,
            },
        });

        return message;
    }

    async getMessages(conversationId: string, limit = 50, offset = 0) {
        return this.prisma.message.findMany({
            where: {
                conversationId,
                deletedAt: null,
            },
            orderBy: { sentAt: 'desc' },
            take: limit,
            skip: offset,
        });
    }

    async markAsRead(conversationId: string, userId: string) {
        await this.prisma.conversationParticipant.updateMany({
            where: {
                conversationId,
                userId,
            },
            data: {
                lastReadAt: new Date(),
            },
        });

        return { success: true };
    }

    async deleteMessage(messageId: string, userId: string) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });

        if (message.senderId !== userId) {
            throw new Error('Unauthorized');
        }

        await this.prisma.message.update({
            where: { id: messageId },
            data: { deletedAt: new Date() },
        });

        return { success: true };
    }
}
