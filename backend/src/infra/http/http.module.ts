import { Module } from "@nestjs/common";
import { PayableController } from "./controllers/payable.controller";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { DatabaseModule } from "@/infra/database/database.module";
import { APP_FILTER } from "@nestjs/core";
import { PrismaExceptionFilter } from "@/infra/http/filters/prisma-exception.filter";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";
import { AssignorController } from "@/infra/http/controllers/assignor.controller";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";

@Module({
  imports: [DatabaseModule],
  controllers: [PayableController, AssignorController],
  providers: [
    CreatePayableUseCase,
    GetPayableByIdUseCase,
    GetAssignorByIdUseCase,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class HttpModule {}
