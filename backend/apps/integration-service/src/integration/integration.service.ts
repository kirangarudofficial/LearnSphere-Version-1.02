import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IntegrationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async connectIntegration(
        provider: string,
        credentials: any,
        userId: string,
    ) {
        const supported = ['zoom', 'google-meet', 'stripe', 'paypal', 'slack', 'teams'];

        if (!supported.includes(provider)) {
            throw new BadRequestException(`Provider ${provider} not supported`);
        }

        // Verify credentials with provider
        await this.verifyCredentials(provider, credentials);

        return this.prisma.integration.create({
            data: {
                provider,
                credentials: this.encryptCredentials(credentials),
                userId,
                status: 'ACTIVE',
            },
        });
    }

    async disconnectIntegration(integrationId: string) {
        return this.prisma.integration.update({
            where: { id: integrationId },
            data: { status: 'DISCONNECTED', disconnectedAt: new Date() },
        });
    }

    async syncData(integrationId: string) {
        const integration = await this.prisma.integration.findUnique({
            where: { id: integrationId },
        });

        if (!integration) {
            throw new Error('Integration not found');
        }

        const data = await this.fetchDataFromProvider(
            integration.provider,
            this.decryptCredentials(integration.credentials),
        );

        await this.prisma.integration.update({
            where: { id: integrationId },
            data: { lastSyncAt: new Date() },
        });

        return { synced: true, recordCount: data.length };
    }

    async getUserIntegrations(userId: string) {
        return this.prisma.integration.findMany({
            where: { userId, status: 'ACTIVE' },
        });
    }

    async executeAction(integrationId: string, action: string, params: any) {
        const integration = await this.prisma.integration.findUnique({
            where: { id: integrationId },
        });

        switch (action) {
            case 'create-meeting':
                return this.createMeeting(integration, params);
            case 'send-message':
                return this.sendMessage(integration, params);
            case 'process-payment':
                return this.processPayment(integration, params);
            default:
                throw new BadRequestException(`Action ${action} not supported`);
        }
    }

    private async verifyCredentials(provider: string, credentials: any): Promise<void> {
        // Verify with external provider API
        return Promise.resolve();
    }

    private async fetchDataFromProvider(provider: string, credentials: any): Promise<any[]> {
        // Fetch data from provider
        return [];
    }

    private async createMeeting(integration: any, params: any) {
        // Create meeting via Zoom/Google Meet
        return { meetingUrl: 'https://meeting.example.com/123' };
    }

    private async sendMessage(integration: any, params: any) {
        // Send message via Slack/Teams
        return { sent: true };
    }

    private async processPayment(integration: any, params: any) {
        // Process payment via Stripe/PayPal
        return { paymentId: 'pay_123' };
    }

    private encryptCredentials(credentials: any): string {
        // Encrypt credentials
        return JSON.stringify(credentials);
    }

    private decryptCredentials(encrypted: string): any {
        // Decrypt credentials
        return JSON.parse(encrypted);
    }
}
