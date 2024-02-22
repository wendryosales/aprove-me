import { InMemoryReceivableRepository } from "@test/repositories/in-memory-receivable-repository";
import { beforeEach, expect } from "vitest";
import { makeReceivable } from "@test/factories/make-receivable";
import { GetReceivableByIdUseCase } from "@/domain/application/use-cases/get-receivable-by-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Get receivable by id", () => {
  let inMemoryReceivableRepository: InMemoryReceivableRepository;
  let sut: GetReceivableByIdUseCase;

  beforeEach(() => {
    inMemoryReceivableRepository = new InMemoryReceivableRepository();

    sut = new GetReceivableByIdUseCase(inMemoryReceivableRepository);
  });

  it("should get a receivable by id", async () => {
    const receivableData = makeReceivable();

    await inMemoryReceivableRepository.create(receivableData);

    const response = await sut.execute({
      receivableId: receivableData.id.toString(),
    });

    const expected = inMemoryReceivableRepository.items[0];
    expect(response.isRight()).toBeTruthy();

    if (response.isRight()) {
      expect(response.value.receivable).toEqual(expected);
    }
  });

  it("should dispathc an error if receivable does not exist", async () => {
    const id = "invalid-id";

    const result = await sut.execute({ receivableId: id });
    expect(result.isLeft()).toBeTruthy();
    if (result.isLeft()) {
      expect(result.value).toEqual(new ResourceNotFoundError());
    }
  });
});
