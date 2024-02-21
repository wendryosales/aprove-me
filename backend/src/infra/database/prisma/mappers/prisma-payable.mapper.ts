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

  static toPrisma(question: Payable): Prisma.PayableUncheckedCreateInput {
    return {
      id: question.id.toString(),
      value: question.value,
      assignorId: question.assignorId.toString(),
      emissionDate: question.emissionDate,
    };
  }
}
