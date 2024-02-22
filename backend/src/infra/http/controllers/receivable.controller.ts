import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CreateReceivableDto } from "../dtos/create-receivable.dto";
import { CreateReceivableUseCase } from "@/domain/application/use-cases/create-receivable";
import { GetReceivableByIdUseCase } from "@/domain/application/use-cases/get-receivable-by-id";
import { DeleteReceivableUseCase } from "@/domain/application/use-cases/delete-receivable";
import { ReceivableAssignorPresenter } from "@/infra/http/presenters/receivable-assignor-presenter";
import { ReceivablePresenter } from "@/infra/http/presenters/receivable-presenter";
import { UpdateReceivableDto } from "@/infra/http/dtos/update-receivable.dto";
import { EditReceivableUseCase } from "@/domain/application/use-cases/edit-receivable";

@Controller("/integrations/receivable")
export class ReceivableController {
  constructor(
    private createReceivableUseCase: CreateReceivableUseCase,
    private getReceivableByIdUseCase: GetReceivableByIdUseCase,
    private deleteReceivableUseCase: DeleteReceivableUseCase,
    private editReceivableUseCase: EditReceivableUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async createReceivable(@Body() body: CreateReceivableDto) {
    const result = await this.createReceivableUseCase.execute(body);

    if (result.isLeft()) {
      throw result.value;
    }

    const { receivable, assignor } = result.value;

    return ReceivableAssignorPresenter.toHTTP(receivable, assignor);
  }

  @Get("/:id")
  @HttpCode(200)
  async getReceivableById(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    receivableId: string,
  ) {
    const result = await this.getReceivableByIdUseCase.execute({
      receivableId,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    return ReceivablePresenter.toHTTP(result.value.receivable);
  }

  @Put("/:id")
  @HttpCode(200)
  async editReceivable(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    receivableId: string,
    @Body() body: UpdateReceivableDto,
  ) {
    const result = await this.editReceivableUseCase.execute({
      receivableId,
      ...body,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    const { receivable } = result.value;

    return ReceivablePresenter.toHTTP(receivable);
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteReceivable(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    receivableId: string,
  ) {
    const result = await this.deleteReceivableUseCase.execute({
      assignorId: receivableId,
    });

    if (result.isLeft()) {
      throw result.value;
    }
  }
}
