import { IsNumber, IsString } from "class-validator";

export class CreateApplicationTypeDto {
    @IsString( { message: 'ApplicationTypeTitle must be a string' })
    ApplicationTypeTitle: string;
    @IsNumber({}, { message: 'ApplicationFees must be a number' })
    ApplicationFees: number;
   
}
