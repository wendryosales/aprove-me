import { PartialType } from "@nestjs/mapped-types";
import { AssignorDto } from "@/infra/http/dtos/assignor.dto";

export class UpdateAssignorDto extends PartialType(AssignorDto) {}
