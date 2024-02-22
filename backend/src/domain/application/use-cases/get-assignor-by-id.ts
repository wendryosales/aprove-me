import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";

type GetAssignorByIdUseCaseResponse = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

@Injectable()
export class GetAssignorByIdUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute(
    id: string,
  ): Promise<GetAssignorByIdUseCaseResponse | undefined> {
    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      throw new ResourceNotFoundError();
    }

    return {
      id: assignor.id.toString(),
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
    };
  }
}
