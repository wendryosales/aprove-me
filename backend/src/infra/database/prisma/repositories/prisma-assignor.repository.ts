import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { Assignor } from "@/domain/enterprise/entities/assignor";
import { PrismaAssignorMapper } from "@/infra/database/prisma/mappers/prisma-assignor.mapper";

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

  async findById(id: string): Promise<Assignor | null> {
    const response = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return null;
    }

    return PrismaAssignorMapper.toDomain(response);
  }
}
