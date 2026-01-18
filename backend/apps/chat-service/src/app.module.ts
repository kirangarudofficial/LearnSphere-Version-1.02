import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { MonitoringModule } from '@shared/monitoring/monitoring.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        MonitoringModule,
        ChatModule,
    ],
})
export class AppModule { }
