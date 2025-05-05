import { IsNumber } from "class-validator";

export class CreateInternationalLicenseDto {
    @IsNumber()
    licenseID: number;
   
}
