import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { AffiliateModule } from './affiliate/affiliate.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AffiliateModule],
})
export class AppModule { }
