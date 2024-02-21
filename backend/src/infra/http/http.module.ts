import { Module } from "@nestjs/common";
import { PayableController } from "./controllers/payable.controller";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { DatabaseModule } from "@/infra/database/database.module";
import { APP_FILTER } from "@nestjs/core";
import { PrismaExceptionFilter } from "@/infra/http/filters/prisma-exception.filter";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";

@Module({
  imports: [DatabaseModule],
  controllers: [PayableController],
  providers: [
    CreatePayableUseCase,
    GetPayableByIdUseCase,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class HttpModule {}
