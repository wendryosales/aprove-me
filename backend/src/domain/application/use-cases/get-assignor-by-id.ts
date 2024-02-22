import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { Either, left, right } from "@/core/either";
import { Assignor } from "@/domain/enterprise/entities/assignor";

interface GetPayableByIdUseCaseRequest {
  assignorId: string;
}

type GetAssignorByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class GetAssignorByIdUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    assignorId,
  }: GetPayableByIdUseCaseRequest): Promise<GetAssignorByIdUseCaseResponse> {
    const assignor = await this.assignorRepository.findById(assignorId);

    if (!assignor) {
      return left(new ResourceNotFoundError());
    }

    return right({ assignor });
  }
}
