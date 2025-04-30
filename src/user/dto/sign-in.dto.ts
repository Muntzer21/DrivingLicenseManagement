import { IsString } from "class-validator";

export class SignInDto {
  @IsString()
  Username: string;
  @IsString()
  Password: string;
 
}
