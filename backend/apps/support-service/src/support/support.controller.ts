import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Support')
@Controller('support')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @Post('tickets')
    async createTicket(
        @CurrentUser('sub') userId: string,
        @Body() dto: { subject: string; description: string; priority: string },
    ) {
        return this.supportService.createTicket(userId, dto.subject, dto.description, dto.priority);
    }

    @Patch('tickets/:id/assign')
    async assignTicket(@Param('id') id: string, @Body() dto: { agentId: string }) {
        return this.supportService.assignTicket(id, dto.agentId);
    }

    @Patch('tickets/:id/resolve')
    async resolveTicket(@Param('id') id: string, @Body() dto: { resolution: string }) {
        return this.supportService.resolveTicket(id, dto.resolution);
    }

    @Post('tickets/:id/comments')
    async addComment(
        @Param('id') id: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { comment: string },
    ) {
        return this.supportService.addComment(id, userId, dto.comment);
    }

    @Get('my-tickets')
    async getUserTickets(@CurrentUser('sub') userId: string) {
        return this.supportService.getUserTickets(userId);
    }
}
