import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class MarketingService {
    constructor(private readonly prisma: PrismaService) { }

    async createCampaign(name: string, type: string, audience: any, content: any) {
        return this.prisma.campaign.create({
            data: { name, type, audience, content, status: 'DRAFT' },
        });
    }

    async launchCampaign(campaignId: string) {
        return this.prisma.campaign.update({
            where: { id: campaignId },
            data: { status: 'ACTIVE', launchedAt: new Date() },
        });
    }

    async trackClick(campaignId: string, userId: string) {
        return this.prisma.campaignClick.create({
            data: { campaignId, userId },
        });
    }

    async getCampaignAnalytics(campaignId: string) {
        const clicks = await this.prisma.campaignClick.count({ where: { campaignId } });
        const conversions = await this.prisma.campaignConversion.count({ where: { campaignId } });

        return { clicks, conversions, conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0 };
    }
}
