import { IsNumber } from "class-validator";

export class CreateLicenseDto {
    @IsNumber()
    applicationId: number;
    @IsNumber()
    driverId: number;
}
