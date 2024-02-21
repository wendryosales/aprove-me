import { PayableRepository } from "@/domain/application/repositories/payable.repository";
import { Payable } from "@/domain/enterprise/entities/payable";

export class InMemoryPayableRepository implements PayableRepository {
  public items: Payable[] = [];

  async create(payable: Payable): Promise<void> {
    this.items.push(payable);
  }

  async findById(id: string): Promise<Payable | null> {
    return this.items.find((payable) => payable.id.toString() === id) || null;
  }
}
