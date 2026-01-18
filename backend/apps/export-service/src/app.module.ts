import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { ExportModule } from './export/export.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ExportModule],
})
export class AppModule { }
