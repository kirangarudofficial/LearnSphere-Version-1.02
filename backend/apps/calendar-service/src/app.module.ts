import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        CalendarModule,
    ],
})
export class AppModule { }
