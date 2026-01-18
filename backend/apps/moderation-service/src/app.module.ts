import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { ModerationModule } from './moderation/moderation.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ModerationModule],
})
export class AppModule { }
