import { uuid } from '../util';
import { IOperationEntity } from '../definition';

export class Operation implements IOperationEntity {

  /**
   * @stable [26.02.2019]
   * @param {string} id
   * @returns {IOperationEntity}
   */
  public static create(id = uuid()): IOperationEntity {
    return new Operation(id);
  }

  /**
   * @stable [26.02.2019]
   * @param {string} id
   */
  constructor(public id: string = uuid()) {
  }
}
