import { IsNumber, IsString } from "class-validator";

export class CreateTestTypeDto {
  @IsString()
  TestTypeTitle: string;
  @IsString()
  TestTypeDescription: string;
  @IsNumber()
  TestTypeFees: number;
}
