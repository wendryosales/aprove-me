import { Module } from "@nestjs/common";
import { ReceivableController } from "./controllers/receivable.controller";
import { CreateReceivableUseCase } from "@/domain/application/use-cases/create-receivable";
import { DatabaseModule } from "@/infra/database/database.module";
import { GetReceivableByIdUseCase } from "@/domain/application/use-cases/get-receivable-by-id";
import { AssignorController } from "@/infra/http/controllers/assignor.controller";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { DeleteReceivableUseCase } from "@/domain/application/use-cases/delete-receivable";
import { filtersProviders } from "@/infra/http/filters/filters-providers";
import { EditReceivableUseCase } from "@/domain/application/use-cases/edit-receivable";
import { EditAssignorUseCase } from "@/domain/application/use-cases/edit-assignor";
import { DeleteAssignorUseCase } from "@/domain/application/use-cases/delete-assignor";

@Module({
  imports: [DatabaseModule],
  controllers: [ReceivableController, AssignorController],
  providers: [
    CreateReceivableUseCase,
    GetReceivableByIdUseCase,
    EditReceivableUseCase,
    DeleteReceivableUseCase,
    GetAssignorByIdUseCase,
    EditAssignorUseCase,
    DeleteAssignorUseCase,
    ...filtersProviders,
  ],
})
export class HttpModule {}
