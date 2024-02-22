import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-id";

export interface AssignorProps {
  document: string;
  email: string;
  phone: string;
  name: string;
}

export type CreateAssignorProps = AssignorProps;

export class Assignor extends Entity<AssignorProps> {
  get document(): string {
    return this.props.document;
  }

  set document(value: string) {
    this.props.document = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  public static create(
    props: CreateAssignorProps,
    id?: UniqueEntityID,
  ): Assignor {
    return new Assignor(props, id);
  }
}
