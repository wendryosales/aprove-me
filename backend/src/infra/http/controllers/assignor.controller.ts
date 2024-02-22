import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";

@Controller("/integrations/assignor")
export class AssignorController {
  constructor(private getAssignorByIdUseCase: GetAssignorByIdUseCase) {}

  @Get("/:id")
  @HttpCode(200)
  getAssignorById(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    id: string,
  ) {
    return this.getAssignorByIdUseCase.execute(id);
  }
}
