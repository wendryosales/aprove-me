import { InMemoryReceivableRepository } from "@test/repositories/in-memory-receivable-repository";
import { beforeEach, expect } from "vitest";
import { CreateReceivableUseCase } from "@/domain/application/use-cases/create-receivable";
import { InMemoryAssignorRepository } from "@test/repositories/in-memory-assignor-repository";
import { makeAssignor } from "@test/factories/make-assignor";
import { makeReceivable } from "@test/factories/make-receivable";

describe("Create Receivable", () => {
  let inMemoryReceivableRepository: InMemoryReceivableRepository;
  let inMemoryAssignorRepository: InMemoryAssignorRepository;
  let sut: CreateReceivableUseCase;

  beforeEach(() => {
    inMemoryReceivableRepository = new InMemoryReceivableRepository();
    inMemoryAssignorRepository = new InMemoryAssignorRepository();

    sut = new CreateReceivableUseCase(
      inMemoryReceivableRepository,
      inMemoryAssignorRepository,
    );
  });

  it("should create a receivable", async () => {
    const assignorData = makeAssignor();
    const receivableData = makeReceivable();

    const data = {
      value: receivableData.value,
      emissionDate: receivableData.emissionDate,
      assignor: {
        document: assignorData.document,
        email: assignorData.email,
        phone: assignorData.phone,
        name: assignorData.name,
      },
    };

    const response = await sut.execute(data);
    const { receivable, assignor } = response.value;

    expect(response.isRight()).toBeTruthy();

    expect(receivable.id).toBeDefined();
    expect(receivable.value).toBe(receivableData.value);
    expect(receivable.emissionDate).toBe(receivableData.emissionDate);
    expect(receivable.assignorId.toString()).toBe(assignor.id.toString());

    expect(assignor.id).toBeDefined();
    expect(assignor.document).toBe(assignorData.document);
    expect(assignor.email).toBe(assignorData.email);
    expect(assignor.phone).toBe(assignorData.phone);
    expect(assignor.name).toBe(assignorData.name);
  });
});
