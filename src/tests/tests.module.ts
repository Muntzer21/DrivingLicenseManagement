import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tests } from './entities/test.entity';
import { TestAppointment } from 'src/test-appointments/entities/test-appointment.entity';
import { TestAppointmentsService } from 'src/test-appointments/test-appointments.service';
import { TestAppointmentsModule } from 'src/test-appointments/test-appointments.module';
import { DriverModule } from 'src/driver/driver.module';
import { ApplicationsService } from 'src/applications/applications.service';
import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([Tests]),TestAppointmentsModule,DriverModule,ApplicationsModule], // Add your entities here if needed
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
