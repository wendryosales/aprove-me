import { UniqueEntityID } from "@/core/entities/unique-id";
import { Entity } from "@/core/entities/entity";

export interface PayableProps {
  value: number;
  emissionDate: Date;
  assignorId: UniqueEntityID;
}

export type CreatePayableProps = PayableProps;

export class Payable extends Entity<PayableProps> {
  get value(): number {
    return this.props.value;
  }

  get emissionDate(): Date {
    return this.props.emissionDate;
  }

  get assignorId(): UniqueEntityID {
    return this.props.assignorId;
  }

  public static create(
    props: CreatePayableProps,
    id?: UniqueEntityID,
  ): Payable {
    return new Payable(props, id);
  }
}
