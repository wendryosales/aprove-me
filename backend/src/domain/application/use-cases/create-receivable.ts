import { Injectable } from "@nestjs/common";
import { Receivable } from "@/domain/enterprise/entities/receivable";
import { Assignor } from "@/domain/enterprise/entities/assignor";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { Either, right } from "@/core/either";

interface CreateReceivableUseCaseRequest {
  value: number;
  emissionDate: Date;
  assignor: {
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}

type CreateReceivableUseCaseResponse = Either<
  null,
  {
    receivable: Receivable;
    assignor: Assignor;
  }
>;

@Injectable()
export class CreateReceivableUseCase {
  constructor(
    private receivableRepository: ReceivableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute(
    data: CreateReceivableUseCaseRequest,
  ): Promise<CreateReceivableUseCaseResponse> {
    const assignor = Assignor.create({
      document: data.assignor.document,
      email: data.assignor.email,
      phone: data.assignor.phone,
      name: data.assignor.name,
    });

    const receivable = Receivable.create({
      emissionDate: data.emissionDate,
      value: data.value,
      assignorId: assignor.id,
    });

    await this.assignorRepository.create(assignor);
    await this.receivableRepository.create(receivable);

    return right({
      receivable,
      assignor,
    });
  }
}
