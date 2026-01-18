import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Coupon')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CouponController {
    constructor(private readonly couponService: CouponService) { }

    @Post()
    async createCoupon(
        @Body() dto: {
            code: string;
            discountType: string;
            discountValue: number;
            expiresAt: string;
            maxUses?: number;
        },
    ) {
        return this.couponService.createCoupon(
            dto.code,
            dto.discountType,
            dto.discountValue,
            new Date(dto.expiresAt),
            dto.maxUses,
        );
    }

    @Get(':code/validate')
    async validateCoupon(@Param('code') code: string) {
        return this.couponService.validateCoupon(code);
    }

    @Post(':code/apply')
    async applyCoupon(
        @Param('code') code: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { orderAmount: number },
    ) {
        return this.couponService.applyCoupon(code, userId, dto.orderAmount);
    }

    @Patch(':id/deactivate')
    async deactivateCoupon(@Param('id') id: string) {
        return this.couponService.deactivateCoupon(id);
    }
}
