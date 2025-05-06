import { IsNumber } from "class-validator";

export class CreateDetainedLicenseDto {
    @IsNumber()
    LicenseID: number;
    @IsNumber()
    FindFees: number; // the fees for the detain
}
