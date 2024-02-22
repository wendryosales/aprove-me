import { Receivable } from "@/domain/enterprise/entities/receivable";

export class ReceivablePresenter {
  static toHTTP(receivable: Receivable) {
    return {
      id: receivable.id.toString(),
      value: receivable.value,
      emissionDate: receivable.emissionDate,
      assignorId: receivable.assignorId.toString(),
    };
  }
}
