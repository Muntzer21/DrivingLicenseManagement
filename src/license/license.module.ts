import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { application } from 'express';
import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([License]),ApplicationsModule],
  controllers: [LicenseController],
  providers: [LicenseService],
  exports: [LicenseService], // Export the service if needed in other modules
})
export class LicenseModule {}
