import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Subscription')
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Post('plans')
    async createPlan(@Body() dto: { name: string; price: number; interval: string; features: any[] }) {
        return this.subscriptionService.createPlan(dto.name, dto.price, dto.interval, dto.features);
    }

    @Post('subscribe')
    async subscribe(@CurrentUser('sub') userId: string, @Body() dto: { planId: string }) {
        return this.subscriptionService.subscribe(userId, dto.planId);
    }

    @Post(':id/cancel')
    async cancelSubscription(@Param('id') id: string) {
        return this.subscriptionService.cancelSubscription(id);
    }

    @Get('my-subscription')
    async getUserSubscription(@CurrentUser('sub') userId: string) {
        return this.subscriptionService.getUserSubscription(userId);
    }
}
