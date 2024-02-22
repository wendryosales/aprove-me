import { Prisma, Receivable as PrismaReceivable } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { Receivable } from "@/domain/enterprise/entities/receivable";

export class PrismaReceivableMapper {
  static toDomain(raw: PrismaReceivable): Receivable {
    return Receivable.create(
      {
        value: raw.value,
        assignorId: new UniqueEntityID(raw.assignorId),
        emissionDate: raw.emissionDate,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    receivable: Receivable,
  ): Prisma.ReceivableUncheckedCreateInput {
    return {
      id: receivable.id.toString(),
      value: receivable.value,
      assignorId: receivable.assignorId.toString(),
      emissionDate: receivable.emissionDate,
    };
  }
}
