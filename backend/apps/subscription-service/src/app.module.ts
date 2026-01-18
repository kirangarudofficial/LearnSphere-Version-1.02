import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SubscriptionModule],
})
export class AppModule { }
