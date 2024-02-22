import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreatePayableDto } from "@/infra/http/dtos/create-payable.dto";

export class UpdatePayableDto extends PartialType(
  OmitType(CreatePayableDto, ["assignor"] as const),
) {}
