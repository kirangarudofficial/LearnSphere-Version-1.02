import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { MonitoringModule } from '@shared/monitoring/monitoring.module';
import { ProcessingModule } from './processing/processing.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        MonitoringModule,
        ProcessingModule,
    ],
})
export class AppModule { }
