import { InMemoryPayableRepository } from "@test/repositories/in-memory-payable-repository";
import { beforeEach, expect } from "vitest";
import { CreatePayableUseCase } from "@/domain/application/use-cases/create-payable";
import { InMemoryAssignorRepository } from "@test/repositories/in-memory-assignor-repository";
import { makeAssignor } from "@test/factories/make-assignor";
import { makePayable } from "@test/factories/make-payable";

describe("Create Payable", () => {
  let inMemoryPayableRepository: InMemoryPayableRepository;
  let inMemoryAssignorRepository: InMemoryAssignorRepository;
  let sut: CreatePayableUseCase;

  beforeEach(() => {
    inMemoryPayableRepository = new InMemoryPayableRepository();
    inMemoryAssignorRepository = new InMemoryAssignorRepository();

    sut = new CreatePayableUseCase(
      inMemoryPayableRepository,
      inMemoryAssignorRepository,
    );
  });

  it("should create a payable", async () => {
    const assignorData = makeAssignor();
    const payableData = makePayable();

    const data = {
      value: payableData.value,
      emissionDate: payableData.emissionDate,
      assignor: {
        document: assignorData.document,
        email: assignorData.email,
        phone: assignorData.phone,
        name: assignorData.name,
      },
    };

    const response = await sut.execute(data);
    const { payable, assignor } = response.value;

    expect(response.isRight()).toBeTruthy();

    expect(payable.id).toBeDefined();
    expect(payable.value).toBe(payableData.value);
    expect(payable.emissionDate).toBe(payableData.emissionDate);
    expect(payable.assignorId.toString()).toBe(assignor.id.toString());

    expect(assignor.id).toBeDefined();
    expect(assignor.document).toBe(assignorData.document);
    expect(assignor.email).toBe(assignorData.email);
    expect(assignor.phone).toBe(assignorData.phone);
    expect(assignor.name).toBe(assignorData.name);
  });
});
