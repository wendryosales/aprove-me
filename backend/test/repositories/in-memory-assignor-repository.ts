import { Assignor } from "@/domain/enterprise/entities/assignor";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";

export class InMemoryAssignorRepository implements AssignorRepository {
  public items: Assignor[] = [];

  async create(assignor: Assignor): Promise<void> {
    this.items.push(assignor);
  }

  async findById(id: string): Promise<Assignor | null> {
    return this.items.find((assignor) => assignor.id.toString() === id) || null;
  }

  async delete(assignor: Assignor): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === assignor.id);
    this.items.splice(itemIndex, 1);
  }

  async save(assignor: Assignor): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === assignor.id);
    this.items[itemIndex] = assignor;
  }
}
