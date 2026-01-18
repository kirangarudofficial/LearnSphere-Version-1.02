import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        FeatureFlagModule,
    ],
})
export class AppModule { }
