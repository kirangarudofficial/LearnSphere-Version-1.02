import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { SurveyModule } from './survey/survey.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SurveyModule],
})
export class AppModule { }
