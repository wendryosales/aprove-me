import { Payable } from "@/domain/enterprise/entities/payable";
import { Assignor } from "@/domain/enterprise/entities/assignor";

export class PayableAssignorPresenter {
  static toHTTP(payable: Payable, assignor: Assignor) {
    return {
      id: payable.id.toString(),
      value: payable.value,
      emissionDate: payable.emissionDate,
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
