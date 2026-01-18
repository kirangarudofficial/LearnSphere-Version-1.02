import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { CartModule } from './cart/cart.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        CartModule,
    ],
})
export class AppModule { }
