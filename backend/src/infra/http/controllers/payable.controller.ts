import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { CreatePayableDto } from "../dtos/create-payable.dto";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";
import { DeletePayableUseCase } from "@/domain/application/use-cases/delete-payable";
import { PayableAssignorPresenter } from "@/infra/http/presenters/payable-assignor-presenter";
import { PayablePresenter } from "@/infra/http/presenters/payable-presenter";

@Controller("/integrations/payable")
export class PayableController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private getPayableByIdUseCase: GetPayableByIdUseCase,
    private deletePayableUseCase: DeletePayableUseCase,
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

  @Delete(":id")
  @HttpCode(204)
  async deletePayable(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    payableId: string,
  ) {
    const result = await this.deletePayableUseCase.execute({
      payableId,
    });

    if (result.isLeft()) {
      throw result.value;
    }
  }
}
