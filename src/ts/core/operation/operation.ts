import { IOperation } from './operation.interface';
import { uuid } from '../util/uuid';

export class Operation implements IOperation {

  id: string;

  constructor(public type: string) {
    this.id = uuid();
  }

  static create(type: string): IOperation {
    return new Operation(type);
  }
}
