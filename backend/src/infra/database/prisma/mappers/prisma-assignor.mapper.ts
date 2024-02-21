import { Assignor as PrismaAssignor, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-id";
import { Assignor } from "@/domain/enterprise/entities/assignor";

export class PrismaAssignorMapper {
  static toDomain(raw: PrismaAssignor): Assignor {
    return Assignor.create(
      {
        name: raw.name,
        document: raw.document,
        email: raw.email,
        phone: raw.phone,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(assignor: Assignor): Prisma.AssignorUncheckedCreateInput {
    return {
      id: assignor.id.toString(),
      name: assignor.name,
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
    };
  }
}
