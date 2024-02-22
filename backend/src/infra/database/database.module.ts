import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { PrismaReceivableRepository } from "@/infra/database/prisma/repositories/prisma-receivable.repository";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { PrismaAssignorRepository } from "@/infra/database/prisma/repositories/prisma-assignor.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository,
    },
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [PrismaService, ReceivableRepository, AssignorRepository],
})
export class DatabaseModule {}
