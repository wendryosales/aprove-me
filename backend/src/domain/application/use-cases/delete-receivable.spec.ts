import { InMemoryReceivableRepository } from "@test/repositories/in-memory-receivable-repository";
import { beforeEach, expect } from "vitest";
import { makeReceivable } from "@test/factories/make-receivable";
import { DeleteReceivableUseCase } from "@/domain/application/use-cases/delete-receivable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Delete Receivable", () => {
  let inMemoryReceivableRepository: InMemoryReceivableRepository;
  let sut: DeleteReceivableUseCase;

  beforeEach(() => {
    inMemoryReceivableRepository = new InMemoryReceivableRepository();

    sut = new DeleteReceivableUseCase(inMemoryReceivableRepository);
  });

  it("should delete a receivable", async () => {
    const receivableData = makeReceivable();

    await inMemoryReceivableRepository.create(receivableData);

    const response = await sut.execute({
      assignorId: receivableData.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
  });

  it("should dispathc an error if receivable does not exist", async () => {
    const id = "invalid-id";

    const result = await sut.execute({ assignorId: id });
    expect(result.isLeft()).toBeTruthy();
    if (result.isLeft()) {
      expect(result.value).toEqual(new ResourceNotFoundError());
    }
  });
});
