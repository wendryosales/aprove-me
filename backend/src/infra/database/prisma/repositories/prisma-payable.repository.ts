import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { Payable } from "@/domain/enterprise/entities/payable";

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async create(payable: Payable): Promise<void> {
    await this.prisma.payable.create({
      data: {
        id: payable.id.toString(),
        value: payable.value,
        assignorId: payable.assignorId.toString(),
        emissionDate: payable.emissionDate,
      },
    });
  }
}
