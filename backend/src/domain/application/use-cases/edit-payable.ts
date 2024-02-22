import { Injectable } from "@nestjs/common";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { Payable } from "@/domain/enterprise/entities/payable";

interface EditPayableUseCaseRequest {
  payableId: string;
  value?: number;
  emissionDate?: Date;
}

type EditPayableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class EditPayableUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute({
    payableId,
    value,
    emissionDate,
  }: EditPayableUseCaseRequest): Promise<EditPayableUseCaseResponse> {
    const payable = await this.payableRepository.findById(payableId);

    if (!payable) {
      return left(new ResourceNotFoundError());
    }

    payable.value = value ?? payable.value;
    payable.emissionDate = emissionDate ?? payable.emissionDate;

    await this.payableRepository.save(payable);

    return right({ payable });
  }
}
