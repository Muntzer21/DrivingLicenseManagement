import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTestDto {
  @IsNumber()
  testAppointmentID: number; // This is a self-referencing relationship

  @IsBoolean()
  testResult: boolean; // true if the test is passed, false if the test is failed

  @IsString()
  @IsOptional()
  notes: string;
}
