import { InMemoryPayableRepository } from "@test/repositories/in-memory-payable-repository";
import { beforeEach, expect } from "vitest";
import { makePayable } from "@test/factories/make-payable";
import { DeletePayableUseCase } from "@/domain/application/use-cases/delete-payable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Delete Payable", () => {
  let inMemoryPayableRepository: InMemoryPayableRepository;
  let sut: DeletePayableUseCase;

  beforeEach(() => {
    inMemoryPayableRepository = new InMemoryPayableRepository();

    sut = new DeletePayableUseCase(inMemoryPayableRepository);
  });

  it("should delete a payable", async () => {
    const payableData = makePayable();

    await inMemoryPayableRepository.create(payableData);

    const response = await sut.execute({
      payableId: payableData.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
  });

  it("should dispathc an error if payable does not exist", async () => {
    const id = "invalid-id";

    const result = await sut.execute({ payableId: id });
    expect(result.isLeft()).toBeTruthy();
    if (result.isLeft()) {
      expect(result.value).toEqual(new ResourceNotFoundError());
    }
  });
});
