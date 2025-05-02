import { PartialType } from '@nestjs/mapped-types';
import { CreateTestAppointmentDto } from './create-test-appointment.dto';

export class UpdateTestAppointmentDto extends PartialType(CreateTestAppointmentDto) {}
