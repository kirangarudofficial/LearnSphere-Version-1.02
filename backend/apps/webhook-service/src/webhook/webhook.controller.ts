import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Webhook')
@Controller('webhooks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) { }

    @Post()
    async register(@Body() dto: { url: string; events: string[]; secret: string }) {
        return this.webhookService.registerWebhook(dto.url, dto.events, dto.secret);
    }

    @Post('trigger')
    async trigger(@Body() dto: { event: string; payload: any }) {
        await this.webhookService.triggerWebhook(dto.event, dto.payload);
        return { success: true };
    }

    @Get()
    async getWebhooks() {
        return this.webhookService.getWebhooks();
    }

    @Patch(':id/deactivate')
    async deactivate(@Param('id') id: string) {
        return this.webhookService.deactivateWebhook(id);
    }
}
