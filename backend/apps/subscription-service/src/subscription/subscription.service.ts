import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class SubscriptionService {
    constructor(private readonly prisma: PrismaService) { }

    async createPlan(name: string, price: number, interval: string, features: any[]) {
        return this.prisma.subscriptionPlan.create({
            data: { name, price, interval, features, isActive: true },
        });
    }

    async subscribe(userId: string, planId: string) {
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: planId } });
        const nextBillingDate = this.calculateNextBillingDate(plan.interval);

        return this.prisma.subscription.create({
            data: {
                userId,
                planId,
                status: 'ACTIVE',
                currentPeriodStart: new Date(),
                currentPeriodEnd: nextBillingDate,
            },
        });
    }

    async cancelSubscription(subscriptionId: string) {
        return this.prisma.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'CANCELLED', cancelledAt: new Date() },
        });
    }

    async getUserSubscription(userId: string) {
        return this.prisma.subscription.findFirst({
            where: { userId, status: 'ACTIVE' },
            include: { plan: true },
        });
    }

    private calculateNextBillingDate(interval: string): Date {
        const date = new Date();
        if (interval === 'monthly') date.setMonth(date.getMonth() + 1);
        else if (interval === 'yearly') date.setFullYear(date.getFullYear() + 1);
        return date;
    }
}
