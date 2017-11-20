import { uuid } from '../util';

import { IOperation } from './operation.interface';

export class Operation implements IOperation {

  public static create(id?: string): IOperation {
    return new Operation(id);
  }

  constructor(public id: string = uuid()) {
  }
}
