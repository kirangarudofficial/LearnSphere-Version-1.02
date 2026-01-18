import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class CouponService {
    constructor(private readonly prisma: PrismaService) { }

    async createCoupon(code: string, discountType: string, discountValue: number, expiresAt: Date, maxUses?: number) {
        return this.prisma.coupon.create({
            data: {
                code: code.toUpperCase(),
                discountType,
                discountValue,
                expiresAt,
                maxUses,
                currentUses: 0,
                isActive: true,
            },
        });
    }

    async validateCoupon(code: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!coupon) {
            throw new BadRequestException('Coupon not found');
        }

        if (!coupon.isActive) {
            throw new BadRequestException('Coupon is inactive');
        }

        if (coupon.expiresAt < new Date()) {
            throw new BadRequestException('Coupon has expired');
        }

        if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
            throw new BadRequestException('Coupon usage limit reached');
        }

        return coupon;
    }

    async applyCoupon(code: string, userId: string, orderAmount: number) {
        const coupon = await this.validateCoupon(code);

        let discount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discount = (orderAmount * coupon.discountValue) / 100;
        } else if (coupon.discountType === 'FIXED') {
            discount = coupon.discountValue;
        }

        await this.prisma.coupon.update({
            where: { id: coupon.id },
            data: { currentUses: { increment: 1 } },
        });

        await this.prisma.couponUsage.create({
            data: {
                couponId: coupon.id,
                userId,
                discountAmount: discount,
            },
        });

        return {
            originalAmount: orderAmount,
            discount,
            finalAmount: orderAmount - discount,
        };
    }

    async deactivateCoupon(couponId: string) {
        return this.prisma.coupon.update({
            where: { id: couponId },
            data: { isActive: false },
        });
    }
}
