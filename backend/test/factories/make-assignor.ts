import { faker } from "@faker-js/faker";

import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { Assignor, AssignorProps } from "@/domain/enterprise/entities/assignor";
import { PrismaAssignorMapper } from "@/infra/database/prisma/mappers/prisma-assignor.mapper";

function fakeCpf() {
  return (
    faker.number.int({ min: 100, max: 999 }).toString() +
    "." +
    faker.number.int({ min: 100, max: 999 }).toString() +
    "." +
    faker.number.int({ min: 100, max: 999 }).toString() +
    "-" +
    faker.number.int({ min: 10, max: 99 }).toString()
  );
}

export function makeAssignor(
  override: Partial<AssignorProps> = {},
  id?: UniqueEntityID,
) {
  return Assignor.create(
    {
      name: faker.person.fullName(),
      document: fakeCpf(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  );
}

@Injectable()
export class AssignorFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAssignor(
    data: Partial<AssignorProps> = {},
  ): Promise<Assignor> {
    const assignor = makeAssignor(data);

    await this.prisma.assignor.create({
      data: PrismaAssignorMapper.toPrisma(assignor),
    });

    return assignor;
  }
}
