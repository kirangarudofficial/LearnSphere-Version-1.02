import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ReviewModule],
})
export class AppModule { }