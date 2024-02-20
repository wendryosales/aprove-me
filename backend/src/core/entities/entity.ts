import { UniqueEntityID } from "./unique-id";

export abstract class Entity<T> {
  protected readonly props: T;
  private readonly _id: UniqueEntityID;

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
