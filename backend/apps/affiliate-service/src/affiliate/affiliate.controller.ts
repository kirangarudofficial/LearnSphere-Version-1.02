import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AffiliateService } from './affiliate.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Affiliate')
@Controller('affiliate')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AffiliateController {
    constructor(private readonly affiliateService: AffiliateService) { }

    @Post('register')
    async registerAffiliate(@CurrentUser('sub') userId: string, @Body() dto: { commissionRate: number }) {
        return this.affiliateService.registerAffiliate(userId, dto.commissionRate);
    }

    @Post('track-referral')
    async trackReferral(@CurrentUser('sub') userId: string, @Body() dto: { affiliateCode: string }) {
        return this.affiliateService.trackReferral(dto.affiliateCode, userId);
    }

    @Post('process-sale')
    async processSale(@Body() dto: { affiliateCode: string; saleAmount: number }) {
        return this.affiliateService.processSale(dto.affiliateCode, dto.saleAmount);
    }

    @Get('earnings')
    async getEarnings(@CurrentUser('sub') userId: string) {
        return this.affiliateService.getEarnings(userId);
    }
}
