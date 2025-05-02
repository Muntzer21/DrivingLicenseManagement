import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { PersonModule } from 'src/person/person.module';
import { LocalDrivingLicenseApplication } from './entities/LocalDrivingLicenseApplication.entity';

@Module({
  imports: [
    JwtModule,
    PersonModule,
    TypeOrmModule.forFeature([Application, LocalDrivingLicenseApplication]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService], // Export the service if needed in other modules
})
export class ApplicationsModule {}
