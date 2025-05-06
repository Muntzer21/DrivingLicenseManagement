import { Module } from '@nestjs/common';
import { DetainedLicensesService } from './detained-licenses.service';
import { DetainedLicensesController } from './detained-licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetainedLicense } from './entities/detained-license.entity';
import { JwtModule } from '@nestjs/jwt';
import { LicenseModule } from 'src/license/license.module';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([DetainedLicense]),LicenseModule],

  controllers: [DetainedLicensesController],
  providers: [DetainedLicensesService],
})
export class DetainedLicensesModule {}
