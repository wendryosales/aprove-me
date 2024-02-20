import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { PrismaPayableRepository } from "@/infra/database/prisma/repositories/prisma-payable.repository";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { PrismaAssignorRepository } from "@/infra/database/prisma/repositories/prisma-assignor.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [PrismaService, PayableRepository, AssignorRepository],
})
export class DatabaseModule {}
