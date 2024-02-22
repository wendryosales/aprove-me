import { InMemoryReceivableRepository } from "@test/repositories/in-memory-receivable-repository";
import { beforeEach, expect } from "vitest";
import { makeReceivable } from "@test/factories/make-receivable";
import { EditReceivableUseCase } from "@/domain/application/use-cases/edit-receivable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Edit receivable", () => {
  let inMemoryReceivableRepository: InMemoryReceivableRepository;
  let sut: EditReceivableUseCase;

  beforeEach(() => {
    inMemoryReceivableRepository = new InMemoryReceivableRepository();

    sut = new EditReceivableUseCase(inMemoryReceivableRepository);
  });

  it("should be able to edit a question", async () => {
    const receivable = makeReceivable({
      value: 200,
    });

    await inMemoryReceivableRepository.create(receivable);

    const response = await sut.execute({
      receivableId: receivable.id.toString(),
      value: 100,
      emissionDate: new Date(),
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) {
      expect(response.value.receivable.value).toBe(100);
    }
  });

  it("should not be able to edit a receivable that does not exist", async () => {
    const response = await sut.execute({
      receivableId: "invalid_id",
      value: 100,
      emissionDate: new Date(),
    });

    expect(response.isLeft()).toBeTruthy();
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});
