import { IsNumber, IsString } from "class-validator";

export class CreateLicenseClassDto {
    @IsString()
    ClassName: string;
    @IsString()
    ClassDescription: string;
    @IsNumber()
     ClassFees: number;
       @IsNumber()
        DefaultValidityLength: number;
}
