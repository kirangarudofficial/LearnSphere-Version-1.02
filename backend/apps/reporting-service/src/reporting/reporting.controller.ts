import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReportingService } from './reporting.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Reporting')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportingController {
    constructor(private readonly reportingService: ReportingService) { }

    @Post('generate')
    async generateReport(@Body() dto: { type: string; filters: any }) {
        return this.reportingService.generateReport(dto.type, dto.filters);
    }

    @Post('schedule')
    async scheduleReport(@Body() dto: { type: string; schedule: string; filters: any }) {
        return this.reportingService.scheduleReport(dto.type, dto.schedule, dto.filters);
    }

    @Get(':id/export')
    async exportReport(@Param('id') id: string, @Query('format') format: string) {
        return this.reportingService.exportReport(id, format || 'pdf');
    }

    @Get('history')
    async getReportHistory(@Query('userId') userId?: string) {
        return this.reportingService.getReportHistory(userId);
    }
}
