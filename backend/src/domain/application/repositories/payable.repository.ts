import { Payable } from "@/domain/enterprise/entities/payable";

export abstract class PayableRepository {
  abstract create(payable: Payable): Promise<void>;
  abstract findById(id: string): Promise<Payable | null>;
}
