import { Injectable } from "@nestjs/common";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";

interface DeletePayableUseCaseRequest {
  assignorId: string;
}

type DeletePayableUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeletePayableUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute({
    assignorId,
  }: DeletePayableUseCaseRequest): Promise<DeletePayableUseCaseResponse> {
    const payable = await this.payableRepository.findById(assignorId);

    if (!payable) {
      return left(new ResourceNotFoundError());
    }

    await this.payableRepository.delete(payable);

    return right(null);
  }
}
