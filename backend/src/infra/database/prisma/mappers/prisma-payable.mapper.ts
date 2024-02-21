import { Payable as PrismaPayable, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { Payable } from "@/domain/enterprise/entities/payable";

export class PrismaPayableMapper {
  static toDomain(raw: PrismaPayable): Payable {
    return Payable.create(
      {
        value: raw.value,
        assignorId: new UniqueEntityID(raw.assignorId),
        emissionDate: raw.emissionDate,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(payable: Payable): Prisma.PayableUncheckedCreateInput {
    return {
      id: payable.id.toString(),
      value: payable.value,
      assignorId: payable.assignorId.toString(),
      emissionDate: payable.emissionDate,
    };
  }
}
