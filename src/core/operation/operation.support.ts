import {
  EntityIdT,
  IEntity,
} from '../definitions.interface';
import {
  join,
  notNilValuesArrayFilter,
} from '../util';
import { IOperationEntity } from '../definition';
import { Operation } from './operation';

/**
 * @stable [02.04.2020]
 * @param {string} uuid
 * @param {EntityIdT} entityId
 * @returns {IOperationEntity}
 */
export const makeEntityOperation =
  <TEntity extends IEntity>(uuid: string,
                            ...entityId: EntityIdT[]): IOperationEntity =>
    Operation.create(
      join(
        notNilValuesArrayFilter(
          uuid,
          ...entityId
        ),
        '-'
      )
    );
