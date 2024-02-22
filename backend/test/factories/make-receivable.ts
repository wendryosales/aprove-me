import { faker } from "@faker-js/faker";

import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import {
  Receivable,
  ReceivableProps,
} from "@/domain/enterprise/entities/receivable";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { PrismaReceivableMapper } from "@/infra/database/prisma/mappers/prisma-receivable.mapper";

export function makeReceivable(
  override: Partial<ReceivableProps> = {},
  id?: UniqueEntityID,
) {
  return Receivable.create(
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
export class ReceivableFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaReceivable(
    data: Partial<ReceivableProps> = {},
  ): Promise<Receivable> {
    const question = makeReceivable(data);

    await this.prisma.receivable.create({
      data: PrismaReceivableMapper.toPrisma(question),
    });

    return question;
  }
}
