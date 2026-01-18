import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { GamificationModule } from './gamification/gamification.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, GamificationModule],
})
export class AppModule { }