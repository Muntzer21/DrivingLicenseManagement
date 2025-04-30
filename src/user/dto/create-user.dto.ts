import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  Username: string;
  @IsString()
  Password: string;
  @IsBoolean()
  isAdmin: boolean;
  @IsNumber()
  PersonId: number; // This will hold the ID of the related Person entity
}
