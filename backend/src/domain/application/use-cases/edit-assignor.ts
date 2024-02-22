import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";
import { Assignor } from "@/domain/enterprise/entities/assignor";

interface EditAssignorUseCaseRequest {
  assignorId: string;
  document: string;
  name: string;
  email: string;
  phone: string;
}

type EditAssignorUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class EditAssignorUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    assignorId,
    document,
    name,
    email,
    phone,
  }: EditAssignorUseCaseRequest): Promise<EditAssignorUseCaseResponse> {
    const assignor = await this.assignorRepository.findById(assignorId);

    if (!assignor) {
      return left(new ResourceNotFoundError());
    }

    assignor.phone = phone;
    assignor.email = email;
    assignor.name = name;
    assignor.document = document;
    await this.assignorRepository.save(assignor);

    return right({ assignor });
  }
}
