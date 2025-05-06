import { PartialType } from '@nestjs/mapped-types';
import { CreateDetainedLicenseDto } from './create-detained-license.dto';

export class UpdateDetainedLicenseDto extends PartialType(CreateDetainedLicenseDto) {}
