import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [CouponController],
    providers: [CouponService, PrismaService],
    exports: [CouponService],
})
export class CouponModule { }
