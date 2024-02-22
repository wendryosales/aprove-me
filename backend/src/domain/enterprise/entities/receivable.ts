import { UniqueEntityID } from "@/core/entities/unique-id";
import { Entity } from "@/core/entities/entity";

export interface ReceivableProps {
  value: number;
  emissionDate: Date;
  assignorId: UniqueEntityID;
}

export type CreateReceivableProps = ReceivableProps;

export class Receivable extends Entity<ReceivableProps> {
  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get emissionDate(): Date {
    return this.props.emissionDate;
  }

  set emissionDate(emissionDate: Date) {
    this.props.emissionDate = emissionDate;
  }

  get assignorId(): UniqueEntityID {
    return this.props.assignorId;
  }

  public static create(
    props: CreateReceivableProps,
    id?: UniqueEntityID,
  ): Receivable {
    return new Receivable(props, id);
  }
}
