import { Assignor } from "@/domain/enterprise/entities/assignor";

export abstract class AssignorRepository {
  abstract create(assignor: Assignor): Promise<void>;
}
