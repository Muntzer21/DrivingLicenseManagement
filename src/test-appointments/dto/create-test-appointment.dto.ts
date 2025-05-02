import { IsNumber } from "class-validator";

export class CreateTestAppointmentDto {
  @IsNumber()
  localDrivingLicenseApplication: number;
  @IsNumber()
  testType: number;
}
