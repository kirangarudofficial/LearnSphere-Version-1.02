import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, CouponModule],
})
export class AppModule { }
