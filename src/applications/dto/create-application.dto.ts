import { IsNumber } from "class-validator";
import { ApplicationType } from "src/application-types/entities/application-type.entity";
import { Person } from "src/person/entities/person.entity";

export class CreateApplicationDto {
  @IsNumber()
  person: number; // PersonId

  @IsNumber()
  ApplicationType: number; // ApplicationTypeID

}
