import { Module } from "@nestjs/common";
import { PayableController } from "./controllers/payable.controller";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { DatabaseModule } from "@/infra/database/database.module";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";
import { AssignorController } from "@/infra/http/controllers/assignor.controller";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { DeletePayableUseCase } from "@/domain/application/use-cases/delete-payable";
import { filtersProviders } from "@/infra/http/filters/filters-providers";
import { EditPayableUseCase } from "@/domain/application/use-cases/edit-payable";
import { EditAssignorUseCase } from "@/domain/application/use-cases/edit-assignor";
import { DeleteAssignorUseCase } from "@/domain/application/use-cases/delete-assignor";

@Module({
  imports: [DatabaseModule],
  controllers: [PayableController, AssignorController],
  providers: [
    CreatePayableUseCase,
    GetPayableByIdUseCase,
    EditPayableUseCase,
    DeletePayableUseCase,
    GetAssignorByIdUseCase,
    EditAssignorUseCase,
    DeleteAssignorUseCase,
    ...filtersProviders,
  ],
})
export class HttpModule {}
