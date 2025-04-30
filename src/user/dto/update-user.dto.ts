import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  Username: string;
  @IsString()
  @IsOptional()
  Password: string;
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
