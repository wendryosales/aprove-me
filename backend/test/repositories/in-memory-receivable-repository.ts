import { ReceivableRepository } from "@/domain/application/repositories/receivable.repository";
import { Receivable } from "@/domain/enterprise/entities/receivable";

export class InMemoryReceivableRepository implements ReceivableRepository {
  public items: Receivable[] = [];

  async create(receivable: Receivable): Promise<void> {
    this.items.push(receivable);
  }

  async findById(id: string): Promise<Receivable | null> {
    return (
      this.items.find((receivable) => receivable.id.toString() === id) || null
    );
  }

  async delete(receivable: Receivable): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === receivable.id);
    this.items.splice(itemIndex, 1);
  }

  async save(receivable: Receivable): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === receivable.id);
    this.items[itemIndex] = receivable;
  }
}
