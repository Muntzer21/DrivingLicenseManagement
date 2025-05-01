import { Module } from '@nestjs/common';
import { LicenseClassesService } from './license-classes.service';
import { LicenseClassesController } from './license-classes.controller';
import { JwtModule } from '@nestjs/jwt';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseClass } from './entities/license-class.entity';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([LicenseClass])],
  controllers: [LicenseClassesController],
  providers: [LicenseClassesService],
})
export class LicenseClassesModule {}
