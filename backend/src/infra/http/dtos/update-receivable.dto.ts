import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateReceivableDto } from "@/infra/http/dtos/create-receivable.dto";

export class UpdateReceivableDto extends PartialType(
  OmitType(CreateReceivableDto, ["assignor"] as const),
) {}
