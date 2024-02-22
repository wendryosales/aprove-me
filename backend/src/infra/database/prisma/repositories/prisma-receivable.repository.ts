import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { Receivable } from "@/domain/enterprise/entities/receivable";
import { PrismaReceivableMapper } from "@/infra/database/prisma/mappers/prisma-receivable.mapper";

@Injectable()
export class PrismaReceivableRepository implements ReceivableRepository {
  constructor(private prisma: PrismaService) {}

  async create(receivable: Receivable): Promise<void> {
    const data = PrismaReceivableMapper.toPrisma(receivable);
    await this.prisma.receivable.create({
      data,
    });
  }

  async findById(id: string): Promise<Receivable | null> {
    const response = await this.prisma.receivable.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return null;
    }

    return PrismaReceivableMapper.toDomain(response);
  }

  async delete(receivable: Receivable): Promise<void> {
    const data = PrismaReceivableMapper.toPrisma(receivable);
    await this.prisma.receivable.delete({
      where: {
        id: data.id,
      },
    });
  }

  async save(receivable: Receivable): Promise<void> {
    const data = PrismaReceivableMapper.toPrisma(receivable);

    await this.prisma.receivable.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
