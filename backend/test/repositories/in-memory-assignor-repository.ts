import { Assignor } from "@/domain/enterprise/entities/assignor";
import { AssignorRepository } from "@/domain/application/repositories/assignor.repository";

export class InMemoryAssignorRepository implements AssignorRepository {
  public items: Assignor[] = [];

  async create(assignor: Assignor): Promise<void> {
    this.items.push(assignor);
  }
}
