import { Injectable } from "@nestjs/common";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { Receivable } from "@/domain/enterprise/entities/receivable";

interface EditReceivableUseCaseRequest {
  receivableId: string;
  value?: number;
  emissionDate?: Date;
}

type EditReceivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receivable: Receivable;
  }
>;

@Injectable()
export class EditReceivableUseCase {
  constructor(private receivable: ReceivableRepository) {}

  async execute({
    receivableId,
    value,
    emissionDate,
  }: EditReceivableUseCaseRequest): Promise<EditReceivableUseCaseResponse> {
    const receivable = await this.receivable.findById(receivableId);

    if (!receivable) {
      return left(new ResourceNotFoundError());
    }

    receivable.value = value ?? receivable.value;
    receivable.emissionDate = emissionDate ?? receivable.emissionDate;

    await this.receivable.save(receivable);

    return right({ receivable });
  }
}
