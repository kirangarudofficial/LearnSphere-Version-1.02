import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Audit Log')
@Controller('audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Post('log')
    async logEvent(@Body() dto: {
        eventType: string;
        userId: string;
        resourceType: string;
        resourceId: string;
        action: string;
        metadata?: any;
    }) {
        return this.auditService.logEvent(
            dto.eventType,
            dto.userId,
            dto.resourceType,
            dto.resourceId,
            dto.action,
            dto.metadata,
        );
    }

    @Get('query')
    async queryLogs(@Query() filters: any) {
        return this.auditService.queryLogs(filters);
    }

    @Get('timeline/:userId')
    async getTimeline(@Param('userId') userId: string) {
        return this.auditService.getTimeline(userId);
    }

    @Post('report')
    async generateAuditReport(@Body() dto: { startDate: string; endDate: string }) {
        return this.auditService.generateAuditReport(dto.startDate, dto.endDate);
    }
}
