import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { WaitlistModule } from './waitlist/waitlist.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, WaitlistModule],
})
export class AppModule { }
