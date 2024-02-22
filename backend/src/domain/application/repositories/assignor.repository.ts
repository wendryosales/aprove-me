import { Assignor } from "@/domain/enterprise/entities/assignor";

export abstract class AssignorRepository {
  abstract create(assignor: Assignor): Promise<void>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract save(assignor: Assignor): Promise<void>;
  abstract delete(assignor: Assignor): Promise<void>;
}
