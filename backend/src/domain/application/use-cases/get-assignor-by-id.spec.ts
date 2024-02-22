import { InMemoryAssignorRepository } from "@test/repositories/in-memory-assignor-repository";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { makeAssignor } from "@test/factories/make-assignor";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { expect } from "vitest";

describe("Get assignor by id", () => {
  let inMemoryAssignorRepository: InMemoryAssignorRepository;
  let sut: GetAssignorByIdUseCase;

  beforeEach(() => {
    inMemoryAssignorRepository = new InMemoryAssignorRepository();

    sut = new GetAssignorByIdUseCase(inMemoryAssignorRepository);
  });

  it("should get a assignor by id", async () => {
    const assignor = makeAssignor();

    await inMemoryAssignorRepository.create(assignor);

    const response = await sut.execute({
      assignorId: assignor.id.toString(),
    });

    const expected = inMemoryAssignorRepository.items[0];
    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) {
      expect(response.value.assignor).toEqual(expected);
    }
  });

  it("should dispatch an error if assignor does not exist", async () => {
    const id = "invalid-id";

    const result = await sut.execute({ assignorId: id });

    expect(result.isLeft()).toBeTruthy();
    if (result.isLeft()) {
      expect(result.value).toEqual(new ResourceNotFoundError());
    }
  });
});
