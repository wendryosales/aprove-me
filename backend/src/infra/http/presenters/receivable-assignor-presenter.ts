import { Receivable } from "@/domain/enterprise/entities/receivable";
import { Assignor } from "@/domain/enterprise/entities/assignor";

export class ReceivableAssignorPresenter {
  static toHTTP(receivable: Receivable, assignor: Assignor) {
    return {
      id: receivable.id.toString(),
      value: receivable.value,
      emissionDate: receivable.emissionDate,
      assignor: {
        id: assignor.id.toString(),
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    };
  }
}
