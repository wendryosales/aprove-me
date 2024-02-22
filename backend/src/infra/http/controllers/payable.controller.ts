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
import { CreatePayableDto } from "../dtos/create-payable.dto";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";
import { DeletePayableUseCase } from "@/domain/application/use-cases/delete-payable";
import { PayableAssignorPresenter } from "@/infra/http/presenters/payable-assignor-presenter";
import { PayablePresenter } from "@/infra/http/presenters/payable-presenter";
import { UpdatePayableDto } from "@/infra/http/dtos/update-payable.dto";
import { EditPayableUseCase } from "@/domain/application/use-cases/edit-payable";

@Controller("/integrations/payable")
export class PayableController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private getPayableByIdUseCase: GetPayableByIdUseCase,
    private deletePayableUseCase: DeletePayableUseCase,
    private editPayableUseCase: EditPayableUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async createPayable(@Body() body: CreatePayableDto) {
    const result = await this.createPayableUseCase.execute(body);

    if (result.isLeft()) {
      throw result.value;
    }

    const { payable, assignor } = result.value;

    return PayableAssignorPresenter.toHTTP(payable, assignor);
  }

  @Get("/:id")
  @HttpCode(200)
  async getPayableById(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    payableId: string,
  ) {
    const result = await this.getPayableByIdUseCase.execute({ payableId });

    if (result.isLeft()) {
      throw result.value;
    }

    return PayablePresenter.toHTTP(result.value.payable);
  }

  @Put("/:id")
  @HttpCode(200)
  async editPayable(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    payableId: string,
    @Body() body: UpdatePayableDto,
  ) {
    const result = await this.editPayableUseCase.execute({
      payableId,
      ...body,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    const { payable } = result.value;

    return PayablePresenter.toHTTP(payable);
  }

  @Delete(":id")
  @HttpCode(204)
  async deletePayable(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    payableId: string,
  ) {
    const result = await this.deletePayableUseCase.execute({
      assignorId: payableId,
    });

    if (result.isLeft()) {
      throw result.value;
    }
  }
}
