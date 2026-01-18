import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { TranslationModule } from './translation/translation.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TranslationModule],
})
export class AppModule { }
