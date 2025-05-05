import { Module } from '@nestjs/common';
import { InternationalLicenseService } from './international-license.service';
import { InternationalLicenseController } from './international-license.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternationalLicense } from './entities/international-license.entity';
import { LicenseService } from 'src/license/license.service';
import { LicenseModule } from 'src/license/license.module';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([InternationalLicense]),LicenseModule], // Add any necessary imports here, such as TypeOrmModule for database entities
  controllers: [InternationalLicenseController],
  providers: [InternationalLicenseService],
})
export class InternationalLicenseModule {}
