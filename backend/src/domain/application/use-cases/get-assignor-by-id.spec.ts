import { InMemoryAssignorRepository } from "@test/repositories/in-memory-assignor-repository";
import { GetAssignorByIdUseCase } from "@/domain/application/use-cases/get-assignor-by-id";
import { makeAssignor } from "@test/factories/make-assignor";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

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

    const response = await sut.execute(assignor.id.toString());

    const expected = inMemoryAssignorRepository.items[0];
    expect(response.id).toEqual(expected.id.toString());
  });

  it("should dispatch an error if assignor does not exist", async () => {
    const id = "invalid-id";

    try {
      await sut.execute(id);
    } catch (error) {
      expect(error).toEqual(new ResourceNotFoundError());
    }
  });
});
