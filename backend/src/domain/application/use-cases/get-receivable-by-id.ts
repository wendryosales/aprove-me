import { Injectable } from "@nestjs/common";
import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { Receivable } from "@/domain/enterprise/entities/receivable";

interface GetReceivableByIdUseCaseRequest {
  receivableId: string;
}

type GetReceivableByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receivable: Receivable;
  }
>;

@Injectable()
export class GetReceivableByIdUseCase {
  constructor(private receivable: ReceivableRepository) {}

  async execute({
    receivableId,
  }: GetReceivableByIdUseCaseRequest): Promise<GetReceivableByIdUseCaseResponse> {
    const receivable = await this.receivable.findById(receivableId);

    if (!receivable) {
      return left(new ResourceNotFoundError());
    }

    return right({ receivable });
  }
}
