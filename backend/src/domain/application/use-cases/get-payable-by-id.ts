import { Injectable } from "@nestjs/common";
import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "@/core/either";
import { Payable } from "@/domain/enterprise/entities/payable";

interface GetPayableByIdUseCaseRequest {
  payableId: string;
}

type GetPayableByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class GetPayableByIdUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute({
    payableId,
  }: GetPayableByIdUseCaseRequest): Promise<
    GetPayableByIdUseCaseResponse | undefined
  > {
    const payable = await this.payableRepository.findById(payableId);

    if (!payable) {
      return left(new ResourceNotFoundError());
    }

    return right({ payable });
  }
}
