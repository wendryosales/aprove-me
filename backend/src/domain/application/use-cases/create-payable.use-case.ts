import { Injectable } from "@nestjs/common";
import { Payable } from "@/domain/enterprise/entities/payable";
import { Assignor } from "@/domain/enterprise/entities/assignor";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";

interface CreatePayableUseCaseRequest {
  value: number;
  emissionDate: Date;
  assignor: {
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}

type CreatePayableUseCaseResponse = {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
  };
};

@Injectable()
export class CreatePayableUseCase {
  constructor(
    private payableRepository: PayableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute(
    data: CreatePayableUseCaseRequest,
  ): Promise<CreatePayableUseCaseResponse> {
    const assignor = Assignor.create({
      document: data.assignor.document,
      email: data.assignor.email,
      phone: data.assignor.phone,
      name: data.assignor.name,
    });

    const payable = Payable.create({
      emissionDate: data.emissionDate,
      value: data.value,
      assignorId: assignor.id,
    });

    await this.assignorRepository.create(assignor);
    await this.payableRepository.create(payable);

    return {
      id: payable.id.toString(),
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: {
        id: assignor.id.toString(),
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    };
  }
}
