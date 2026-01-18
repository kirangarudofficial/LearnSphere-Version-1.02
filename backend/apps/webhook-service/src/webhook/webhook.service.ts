import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async registerWebhook(url: string, events: string[], secret: string) {
        return this.prisma.webhook.create({
            data: {
                url,
                events,
                secret,
                isActive: true,
            },
        });
    }

    async triggerWebhook(event: string, payload: any) {
        const webhooks = await this.prisma.webhook.findMany({
            where: {
                isActive: true,
                events: { has: event },
            },
        });

        for (const webhook of webhooks) {
            try {
                await this.sendWebhook(webhook, event, payload);
            } catch (error) {
                this.logger.error(`Failed to send webhook ${webhook.id}: ${error.message}`);
            }
        }
    }

    private async sendWebhook(webhook: any, event: string, payload: any) {
        const data = {
            event,
            timestamp: new Date().toISOString(),
            data: payload,
        };

        await firstValueFrom(
            this.httpService.post(webhook.url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Secret': webhook.secret,
                },
            }),
        );

        this.logger.log(`Webhook sent to ${webhook.url} for event ${event}`);
    }

    async getWebhooks() {
        return this.prisma.webhook.findMany();
    }

    async deactivateWebhook(webhookId: string) {
        return this.prisma.webhook.update({
            where: { id: webhookId },
            data: { isActive: false },
        });
    }
}
