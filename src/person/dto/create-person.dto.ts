import {  IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../enums/geneder';

export class CreatePersonDto {
  @IsString()
  NationalNo: string;
  @IsString()
  Firstname: string;
  @IsString()
  Secondname: string;
  @IsString()
  Thridname: string;
  @IsString()
  Lastname: string;

  @IsEnum(Gender, { message: 'the value must be male or female' })
  gender: Gender;

//   @IsDateString()
//   dateOfBirth: Date; // This will map to a Date object in TypeScript
  @IsString()
  Nationality: string;
  @IsOptional()
  Address: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
}
