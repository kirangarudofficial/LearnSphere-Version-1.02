import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Billing')
@Controller('billing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Post('invoices')
    async createInvoice(
        @CurrentUser('sub') userId: string,
        @Body() dto: { amount: number; items: any[] },
    ) {
        return this.billingService.createInvoice(userId, dto.amount, dto.items);
    }

    @Patch('invoices/:id/pay')
    async markPaid(@Param('id') id: string, @Body() dto: { paymentId: string }) {
        return this.billingService.markInvoicePaid(id, dto.paymentId);
    }

    @Get('my-invoices')
    async getUserInvoices(@CurrentUser('sub') userId: string) {
        return this.billingService.getUserInvoices(userId);
    }

    @Get('subscriptions/:id/next-billing')
    async getNextBilling(@Param('id') id: string) {
        return this.billingService.calculateRecurringBilling(id);
    }

    @Post('subscriptions/:id/process-payment')
    async processRecurringPayment(@Param('id') id: string) {
        return this.billingService.processRecurringPayment(id);
    }
}
