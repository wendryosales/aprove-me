import { Receivable } from "@/domain/enterprise/entities/receivable";

export abstract class ReceivableRepository {
  abstract create(receivable: Receivable): Promise<void>;
  abstract findById(id: string): Promise<Receivable | null>;
  abstract save(receivable: Receivable): Promise<void>;
  abstract delete(receivable: Receivable): Promise<void>;
}
