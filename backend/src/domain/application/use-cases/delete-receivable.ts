import { Injectable } from "@nestjs/common";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";

interface DeleteReceivableUseCaseRequest {
  assignorId: string;
}

type DeleteReceivableUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteReceivableUseCase {
  constructor(private receivable: ReceivableRepository) {}

  async execute({
    assignorId,
  }: DeleteReceivableUseCaseRequest): Promise<DeleteReceivableUseCaseResponse> {
    const receivable = await this.receivable.findById(assignorId);

    if (!receivable) {
      return left(new ResourceNotFoundError());
    }

    await this.receivable.delete(receivable);

    return right(null);
  }
}
