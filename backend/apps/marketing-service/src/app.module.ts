import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { MarketingModule } from './marketing/marketing.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, MarketingModule],
})
export class AppModule { }
