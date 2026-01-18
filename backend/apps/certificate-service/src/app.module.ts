import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, CertificateModule],
})
export class AppModule { }