import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { Payable } from "@/domain/enterprise/entities/payable";
import { PrismaPayableMapper } from "@/infra/database/prisma/mappers/prisma-payable.mapper";

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async create(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);
    await this.prisma.payable.create({
      data,
    });
  }

  async findById(id: string): Promise<Payable | null> {
    const response = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return null;
    }

    return PrismaPayableMapper.toDomain(response);
  }

  async delete(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);
    await this.prisma.payable.delete({
      where: {
        id: data.id,
      },
    });
  }

  async save(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);

    await this.prisma.payable.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
