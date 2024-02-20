import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-id";

interface AssignorProps {
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

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  public static create(
    props: CreateAssignorProps,
    id?: UniqueEntityID,
  ): Assignor {
    return new Assignor(props, id);
  }
}
