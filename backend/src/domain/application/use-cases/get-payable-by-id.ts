import { Injectable } from "@nestjs/common";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

type GetPayableByIdUseCaseResponse = {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
};

@Injectable()
export class GetPayableByIdUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute(
    id: string,
  ): Promise<GetPayableByIdUseCaseResponse | undefined> {
    const payable = await this.payableRepository.findById(id);

    if (!payable) {
      throw new ResourceNotFoundError();
    }

    return {
      id: payable.id.toString(),
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId.toString(),
    };
  }
}
