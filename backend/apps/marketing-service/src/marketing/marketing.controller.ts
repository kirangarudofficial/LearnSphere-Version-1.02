import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Marketing')
@Controller('marketing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MarketingController {
    constructor(private readonly marketingService: MarketingService) { }

    @Post('campaigns')
    async createCampaign(@Body() dto: { name: string; type: string; audience: any; content: any }) {
        return this.marketingService.createCampaign(dto.name, dto.type, dto.audience, dto.content);
    }

    @Post('campaigns/:id/launch')
    async launchCampaign(@Param('id') id: string) {
        return this.marketingService.launchCampaign(id);
    }

    @Post('campaigns/:id/track-click')
    async trackClick(@Param('id') campaignId: string, @CurrentUser('sub') userId: string) {
        return this.marketingService.trackClick(campaignId, userId);
    }

    @Get('campaigns/:id/analytics')
    async getCampaignAnalytics(@Param('id') id: string) {
        return this.marketingService.getCampaignAnalytics(id);
    }
}
