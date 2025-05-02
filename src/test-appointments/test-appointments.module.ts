import { Module } from '@nestjs/common';
import { TestAppointmentsService } from './test-appointments.service';
import { TestAppointmentsController } from './test-appointments.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAppointment } from './entities/test-appointment.entity';
import { TestTypesModule } from 'src/test-types/test-types.module';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([TestAppointment]),TestTypesModule], // Add your entities here
  controllers: [TestAppointmentsController],
  providers: [TestAppointmentsService],
  exports: [TestAppointmentsService], // Export the service if needed in other modules
})
export class TestAppointmentsModule {}
