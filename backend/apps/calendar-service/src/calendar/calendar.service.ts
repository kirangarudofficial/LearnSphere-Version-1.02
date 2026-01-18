import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class CalendarService {
    constructor(private readonly prisma: PrismaService) { }

    async createEvent(
        title: string,
        description: string,
        startTime: Date,
        endTime: Date,
        userId: string,
        attendees?: string[],
    ) {
        const event = await this.prisma.calendarEvent.create({
            data: {
                title,
                description,
                startTime,
                endTime,
                organizerId: userId,
                status: 'SCHEDULED',
            },
        });

        // Add attendees
        if (attendees && attendees.length > 0) {
            await Promise.all(
                attendees.map(attendeeId =>
                    this.prisma.eventAttendee.create({
                        data: {
                            eventId: event.id,
                            userId: attendeeId,
                            status: 'INVITED',
                        },
                    }),
                ),
            );
        }

        return event;
    }

    async updateEvent(eventId: string, updates: any) {
        return this.prisma.calendarEvent.update({
            where: { id: eventId },
            data: {
                ...updates,
                updatedAt: new Date(),
            },
        });
    }

    async deleteEvent(eventId: string) {
        return this.prisma.calendarEvent.delete({
            where: { id: eventId },
        });
    }

    async getEvent(eventId: string) {
        const event = await this.prisma.calendarEvent.findUnique({
            where: { id: eventId },
            include: {
                organizer: { select: { id: true, name: true } },
                attendees: {
                    include: {
                        user: { select: { id: true, name: true, email: true } },
                    },
                },
            },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }

    async getUserEvents(userId: string, startDate?: Date, endDate?: Date) {
        return this.prisma.calendarEvent.findMany({
            where: {
                OR: [
                    { organizerId: userId },
                    { attendees: { some: { userId } } },
                ],
                ...(startDate && { startTime: { gte: startDate } }),
                ...(endDate && { endTime: { lte: endDate } }),
            },
            include: {
                organizer: { select: { id: true, name: true } },
                attendees: {
                    include: {
                        user: { select: { id: true, name: true } },
                    },
                },
            },
            orderBy: { startTime: 'asc' },
        });
    }

    async respondToInvitation(eventId: string, userId: string, response: string) {
        return this.prisma.eventAttendee.updateMany({
            where: {
                eventId,
                userId,
            },
            data: {
                status: response, // ACCEPTED, DECLINED, TENTATIVE
            },
        });
    }

    async getUpcomingEvents(userId: string, days: number = 7) {
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);

        return this.getUserEvents(userId, now, endDate);
    }
}
