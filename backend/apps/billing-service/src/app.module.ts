import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { BillingModule } from './billing/billing.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, BillingModule],
})
export class AppModule { }
