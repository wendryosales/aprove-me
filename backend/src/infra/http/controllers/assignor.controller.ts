import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { AssignorPresenter } from "@/infra/http/presenters/assignor-presenter";

@Controller("/integrations/assignor")
export class AssignorController {
  constructor(private getAssignorByIdUseCase: GetAssignorByIdUseCase) {}

  @Get("/:id")
  @HttpCode(200)
  async getAssignorById(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const result = await this.getAssignorByIdUseCase.execute({
      assignorId: id,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    return AssignorPresenter.toHTTP(result.value.assignor);
  }
}
