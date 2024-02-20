import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { Assignor } from "@/domain/enterprise/entities/assignor";

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create(assignor: Assignor): Promise<void> {
    await this.prisma.assignor.create({
      data: {
        id: assignor.id.toString(),
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    });
  }
}
