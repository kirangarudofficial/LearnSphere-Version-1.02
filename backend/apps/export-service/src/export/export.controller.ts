import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Export')
@Controller('export')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExportController {
    constructor(private readonly exportService: ExportService) { }

    @Post()
    async exportData(@Body() dto: { type: string; format: string; filters: any }) {
        return this.exportService.exportData(dto.type, dto.format, dto.filters);
    }

    @Get('jobs/:id')
    async getJobStatus(@Param('id') id: string) {
        return this.exportService.getJobStatus(id);
    }
}
