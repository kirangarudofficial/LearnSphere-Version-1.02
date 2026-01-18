import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Calendar')
@Controller('calendar')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Post('events')
    async createEvent(
        @CurrentUser('sub') userId: string,
        @Body() dto: {
            title: string;
            description: string;
            startTime: Date;
            endTime: Date;
            attendees?: string[];
        },
    ) {
        return this.calendarService.createEvent(
            dto.title,
            dto.description,
            new Date(dto.startTime),
            new Date(dto.endTime),
            userId,
            dto.attendees,
        );
    }

    @Patch('events/:id')
    async updateEvent(@Param('id') id: string, @Body() updates: any) {
        return this.calendarService.updateEvent(id, updates);
    }

    @Delete('events/:id')
    async deleteEvent(@Param('id') id: string) {
        return this.calendarService.deleteEvent(id);
    }

    @Get('events/:id')
    async getEvent(@Param('id') id: string) {
        return this.calendarService.getEvent(id);
    }

    @Get('events')
    async getUserEvents(
        @CurrentUser('sub') userId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.calendarService.getUserEvents(
            userId,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined,
        );
    }

    @Post('events/:id/respond')
    async respondToInvitation(
        @Param('id') eventId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { response: string },
    ) {
        return this.calendarService.respondToInvitation(eventId, userId, dto.response);
    }

    @Get('upcoming')
    async getUpcomingEvents(
        @CurrentUser('sub') userId: string,
        @Query('days') days?: number,
    ) {
        return this.calendarService.getUpcomingEvents(userId, days ? +days : 7);
    }
}
