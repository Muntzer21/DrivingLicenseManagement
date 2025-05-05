import { PartialType } from '@nestjs/mapped-types';
import { CreateInternationalLicenseDto } from './create-international-license.dto';

export class UpdateInternationalLicenseDto extends PartialType(CreateInternationalLicenseDto) {}
