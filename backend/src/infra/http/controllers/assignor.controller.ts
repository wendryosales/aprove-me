import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { AssignorPresenter } from "@/infra/http/presenters/assignor-presenter";
import { EditAssignorUseCase } from "@/domain/application/use-cases/edit-assignor";
import { DeletePayableUseCase } from "@/domain/application/use-cases/delete-payable";
import { UpdateAssignorDto } from "@/infra/http/dtos/update-assignor.dto";

@Controller("/integrations/assignor")
export class AssignorController {
  constructor(
    private getAssignorByIdUseCase: GetAssignorByIdUseCase,
    private editAssignorUseCase: EditAssignorUseCase,
    private deleteAssignorUseCase: DeletePayableUseCase,
  ) {}

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

  @Put("/:id")
  @HttpCode(200)
  async editAssignor(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    assignorId: string,
    @Body() body: UpdateAssignorDto,
  ) {
    const result = await this.editAssignorUseCase.execute({
      assignorId: assignorId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      document: body.document,
      ...body,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    const { assignor } = result.value;

    return AssignorPresenter.toHTTP(assignor);
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteAssignor(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    assignorId: string,
  ) {
    const result = await this.deleteAssignorUseCase.execute({
      assignorId,
    });

    if (result.isLeft()) {
      throw result.value;
    }
  }
}
