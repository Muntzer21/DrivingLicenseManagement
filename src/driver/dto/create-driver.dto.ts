import { IsNumber } from "class-validator";

export class CreateDriverDto {
    @IsNumber()
    personId: number; // PersonId
}
