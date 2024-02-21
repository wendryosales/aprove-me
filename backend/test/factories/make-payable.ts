import { faker } from "@faker-js/faker";

import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Payable, PayableProps } from "@/domain/enterprise/entities/payable";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { PrismaPayableMapper } from "@/infra/database/prisma/mappers/prisma-payable.mapper";

export function makePayable(
  override: Partial<PayableProps> = {},
  id?: UniqueEntityID,
) {
  return Payable.create(
    {
      value: Number(faker.finance.amount()),
      emissionDate: faker.date.recent(),
      assignorId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
}

@Injectable()
export class PayableFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPayable(data: Partial<PayableProps> = {}): Promise<Payable> {
    const question = makePayable(data);

    await this.prisma.payable.create({
      data: PrismaPayableMapper.toPrisma(question),
    });

    return question;
  }
}
