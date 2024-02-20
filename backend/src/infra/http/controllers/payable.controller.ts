import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreatePayableDto } from "../dtos/create-payable.dto";

@Controller("/integrations/payable")
export class PayableController {
  @Post()
  @HttpCode(201)
  createPayable(@Body() body: CreatePayableDto) {
    return body;
  }
}
