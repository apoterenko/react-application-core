import { IEntity, EntityIdT } from '../definitions.interface';
import { ifNotEmptyThanValue } from '../util';
import { IOperationEntity } from '../definition';
import { Operation } from './operation';

/**
 * @stable [04.09.2019]
 * @param {string} uuid
 * @param {EntityIdT} entityId
 * @returns {IOperationEntity}
 */
export const makeEntityOperation = <TEntity extends IEntity>(uuid: string,
                                                             entityId: EntityIdT): IOperationEntity =>
  Operation.create(
    ifNotEmptyThanValue(
      entityId,
      () => `${uuid}-${entityId}`,
      uuid
    )
  );
