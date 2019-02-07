import { uuid } from '../util';
import { IOperationEntity } from '../entities-definitions.interface';

export class Operation implements IOperationEntity {

  public static create(id = uuid()): IOperationEntity {
    return new Operation(id);
  }

  constructor(public id: string = uuid()) {
  }
}
