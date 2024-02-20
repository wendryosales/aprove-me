import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreatePayableDto } from "../dtos/create-payable.dto";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable.use-case";

@Controller("/integrations/payable")
export class PayableController {
  constructor(private createPayableUseCase: CreatePayableUseCase) {}

  @Post()
  @HttpCode(201)
  createPayable(@Body() body: CreatePayableDto) {
    return this.createPayableUseCase.execute(body);
  }
}
