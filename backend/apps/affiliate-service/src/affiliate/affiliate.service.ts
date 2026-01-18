import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class AffiliateService {
    constructor(private readonly prisma: PrismaService) { }

    async registerAffiliate(userId: string, commissionRate: number) {
        const code = this.generateAffiliateCode();

        return this.prisma.affiliate.create({
            data: { userId, code, commissionRate, isActive: true },
        });
    }

    async trackReferral(affiliateCode: string, referredUserId: string) {
        const affiliate = await this.prisma.affiliate.findUnique({ where: { code: affiliateCode } });

        return this.prisma.referral.create({
            data: { affiliateId: affiliate.id, referredUserId },
        });
    }

    async processSale(affiliateCode: string, saleAmount: number) {
        const affiliate = await this.prisma.affiliate.findUnique({ where: { code: affiliateCode } });
        const commission = saleAmount * (affiliate.commissionRate / 100);

        return this.prisma.commission.create({
            data: { affiliateId: affiliate.id, amount: commission, status: 'PENDING' },
        });
    }

    async getEarnings(userId: string) {
        const affiliate = await this.prisma.affiliate.findFirst({ where: { userId } });
        const commissions = await this.prisma.commission.findMany({ where: { affiliateId: affiliate.id } });

        return {
            totalEarned: commissions.reduce((sum, c) => sum + Number(c.amount), 0),
            pending: commissions.filter(c => c.status === 'PENDING').length,
            paid: commissions.filter(c => c.status === 'PAID').length,
        };
    }

    private generateAffiliateCode(): string {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
}
