import { InMemoryPayableRepository } from "@test/repositories/in-memory-payable-repository";
import { beforeEach, expect } from "vitest";
import { makePayable } from "@test/factories/make-payable";
import { GetPayableByIdUseCase } from "@/domain/application/use-cases/get-payable-by-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

describe("Get payable by id", () => {
  let inMemoryPayableRepository: InMemoryPayableRepository;
  let sut: GetPayableByIdUseCase;

  beforeEach(() => {
    inMemoryPayableRepository = new InMemoryPayableRepository();

    sut = new GetPayableByIdUseCase(inMemoryPayableRepository);
  });

  it("should get a payable by id", async () => {
    const payableData = makePayable();

    await inMemoryPayableRepository.create(payableData);

    const response = await sut.execute(payableData.id.toString());

    const expected = inMemoryPayableRepository.items[0];
    expect(response.id).toEqual(expected.id.toString());
  });

  it("should dispathc an error if payable does not exist", async () => {
    const id = "invalid-id";

    try {
      await sut.execute(id);
    } catch (error) {
      expect(error).toEqual(new ResourceNotFoundError());
    }
  });
});
