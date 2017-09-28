import { uuid } from '../util';

import { IOperation } from './operation.interface';

export class Operation implements IOperation {

  public static create(type: string): IOperation {
    return new Operation(type);
  }

  public id: string;

  constructor(public type: string) {
    this.id = uuid();
  }
}
