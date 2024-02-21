import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { CreatePayableDto } from "../dtos/create-payable.dto";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";

@Controller("/integrations/payable")
export class PayableController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private getPayableByIdUseCase: GetPayableByIdUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  createPayable(@Body() body: CreatePayableDto) {
    return this.createPayableUseCase.execute(body);
  }

  @Get("/:id")
  @HttpCode(200)
  getPayableById(
    @Param("id", new ParseUUIDPipe({ version: "4", errorHttpStatusCode: 400 }))
    id: string,
  ) {
    return this.getPayableByIdUseCase.execute(id);
  }
}
