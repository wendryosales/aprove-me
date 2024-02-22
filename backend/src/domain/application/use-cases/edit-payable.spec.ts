import { InMemoryPayableRepository } from "@test/repositories/in-memory-payable-repository";
import { beforeEach, expect } from "vitest";
import { makePayable } from "@test/factories/make-payable";
import { EditPayableUseCase } from "@/domain/application/use-cases/edit-payable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Edit payable", () => {
  let inMemoryPayableRepository: InMemoryPayableRepository;
  let sut: EditPayableUseCase;

  beforeEach(() => {
    inMemoryPayableRepository = new InMemoryPayableRepository();

    sut = new EditPayableUseCase(inMemoryPayableRepository);
  });

  it("should be able to edit a question", async () => {
    const payable = makePayable({
      value: 200,
    });

    await inMemoryPayableRepository.create(payable);

    const response = await sut.execute({
      payableId: payable.id.toString(),
      value: 100,
      emissionDate: new Date(),
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) {
      expect(response.value.payable.value).toBe(100);
    }
  });

  it("should not be able to edit a payable that does not exist", async () => {
    const response = await sut.execute({
      payableId: "invalid_id",
      value: 100,
      emissionDate: new Date(),
    });

    expect(response.isLeft()).toBeTruthy();
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});
