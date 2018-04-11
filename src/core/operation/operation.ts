import { uuid } from '../util';
import { IOperationEntity } from '../entities-definitions.interface';

/* @stable - 11.04.2018 */
export class Operation implements IOperationEntity {

  public static create(id?: string): IOperationEntity {
    return new Operation(id);
  }

  constructor(public id: string = uuid()) {
  }
}
