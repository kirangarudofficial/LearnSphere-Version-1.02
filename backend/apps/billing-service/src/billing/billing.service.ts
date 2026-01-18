import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class BillingService {
    constructor(private readonly prisma: PrismaService) { }

    async createInvoice(userId: string, amount: number, items: any[]) {
        return this.prisma.invoice.create({
            data: {
                userId,
                amount,
                items,
                status: 'PENDING',
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
    }

    async markInvoicePaid(invoiceId: string, paymentId: string) {
        return this.prisma.invoice.update({
            where: { id: invoiceId },
            data: {
                status: 'PAID',
                paymentId,
                paidAt: new Date(),
            },
        });
    }

    async getUserInvoices(userId: string) {
        return this.prisma.invoice.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async calculateRecurringBilling(subscriptionId: string) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { id: subscriptionId },
        });

        const nextBillingDate = new Date(subscription.currentPeriodEnd);
        const amount = subscription.plan.price;

        return {
            subscriptionId,
            nextBillingDate,
            amount,
        };
    }

    async processRecurringPayment(subscriptionId: string) {
        // Process recurring subscription payment
        const billing = await this.calculateRecurringBilling(subscriptionId);
        return this.createInvoice(billing.subscriptionId, billing.amount, [{ type: 'subscription' }]);
    }
}
