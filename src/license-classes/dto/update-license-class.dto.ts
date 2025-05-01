import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenseClassDto } from './create-license-class.dto';

export class UpdateLicenseClassDto extends PartialType(CreateLicenseClassDto) {}
