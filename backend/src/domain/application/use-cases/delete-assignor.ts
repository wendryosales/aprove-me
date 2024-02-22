import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";

interface DeleteAssignorUseCaseRequest {
  assignorId: string;
}

type DeleteAssignorUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteAssignorUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    assignorId,
  }: DeleteAssignorUseCaseRequest): Promise<DeleteAssignorUseCaseResponse> {
    const assignor = await this.assignorRepository.findById(assignorId);

    if (!assignor) {
      return left(new ResourceNotFoundError());
    }

    await this.assignorRepository.delete(assignor);

    return right(null);
  }
}
