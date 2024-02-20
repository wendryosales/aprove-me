import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { AssignorDto } from "./assignor.dto";
import { Type } from "class-transformer";

export class CreatePayableDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
