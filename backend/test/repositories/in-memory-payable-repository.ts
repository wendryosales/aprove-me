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

  async delete(payable: Payable): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === payable.id);
    this.items.splice(itemIndex, 1);
  }

  async save(payable: Payable): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === payable.id);
    this.items[itemIndex] = payable;
  }
}
