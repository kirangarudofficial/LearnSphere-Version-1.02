import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Email')
@Controller('email')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('send')
    async sendEmail(@Body() dto: { to: string; subject: string; body: string; from?: string }) {
        return this.emailService.sendEmail(dto.to, dto.subject, dto.body, dto.from);
    }

    @Post('send-template')
    async sendTemplateEmail(@Body() dto: { to: string; templateId: string; data: any }) {
        return this.emailService.sendTemplateEmail(dto.to, dto.templateId, dto.data);
    }

    @Post('send-bulk')
    async sendBulkEmail(@Body() dto: { recipients: string[]; subject: string; body: string }) {
        return this.emailService.sendBulkEmail(dto.recipients, dto.subject, dto.body);
    }

    @Get('status/:id')
    async getEmailStatus(@Param('id') id: string) {
        return this.emailService.getEmailStatus(id);
    }

    @Post('templates')
    async createTemplate(@Body() dto: { name: string; subject: string; body: string }) {
        return this.emailService.createTemplate(dto.name, dto.subject, dto.body);
    }

    @Get('templates')
    async getTemplates() {
        return this.emailService.getTemplates();
    }
}
