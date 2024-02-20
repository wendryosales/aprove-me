import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { AssignorDto } from "./assignor.dto";
import { Type } from "class-transformer";

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  emissionDate: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AssignorDto)
  assignor: AssignorDto;
}
