import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) { }

    async searchCourses(query: string, filters: any = {}) {
        const { category, priceMin, priceMax, rating, level } = filters;

        const courses = await this.prisma.course.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } },
                            { tags: { has: query } },
                        ],
                    },
                    category ? { category } : {},
                    priceMin ? { price: { gte: priceMin } } : {},
                    priceMax ? { price: { lte: priceMax } } : {},
                    rating ? { avgRating: { gte: rating } } : {},
                    level ? { level } : {},
                ],
            },
            include: {
                instructor: { select: { id: true, name: true } },
            },
            take: 50,
        });

        return { results: courses, total: courses.length };
    }

    async searchContent(query: string, courseId?: string) {
        const content = await this.prisma.lesson.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { content: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                    courseId ? { courseId } : {},
                ],
            },
            include: {
                course: { select: { id: true, title: true } },
            },
            take: 50,
        });

        return { results: content, total: content.length };
    }

    async searchUsers(query: string, role?: string) {
        const users = await this.prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { email: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                    role ? { role } : {},
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
            },
            take: 50,
        });

        return { results: users, total: users.length };
    }

    async indexDocument(type: string, id: string, data: any) {
        // Index document for search (e.g., Elasticsearch)
        return { indexed: true, type, id };
    }

    async removeDocument(type: string, id: string) {
        // Remove from search index
        return { removed: true, type, id };
    }
}
