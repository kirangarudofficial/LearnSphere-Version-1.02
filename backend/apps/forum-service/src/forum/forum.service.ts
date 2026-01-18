import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class ForumService {
    constructor(private readonly prisma: PrismaService) { }

    async createThread(courseId: string, title: string, content: string, authorId: string) {
        return this.prisma.forumThread.create({
            data: {
                courseId,
                title,
                content,
                authorId,
                isPinned: false,
                isLocked: false,
            },
        });
    }

    async replyToThread(threadId: string, content: string, authorId: string) {
        return this.prisma.forumPost.create({
            data: {
                threadId,
                content,
                authorId,
            },
        });
    }

    async getCourseThreads(courseId: string) {
        return this.prisma.forumThread.findMany({
            where: { courseId },
            include: {
                author: { select: { id: true, name: true } },
                _count: { select: { posts: true } },
            },
            orderBy: [
                { isPinned: 'desc' },
                { createdAt: 'desc' },
            ],
        });
    }

    async getThreadPosts(threadId: string) {
        return this.prisma.forumPost.findMany({
            where: { threadId },
            include: {
                author: { select: { id: true, name: true, avatar: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }

    async pinThread(threadId: string) {
        return this.prisma.forumThread.update({
            where: { id: threadId },
            data: { isPinned: true },
        });
    }

    async lockThread(threadId: string) {
        return this.prisma.forumThread.update({
            where: { id: threadId },
            data: { isLocked: true },
        });
    }
}
