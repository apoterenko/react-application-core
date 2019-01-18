import * as R from 'ramda';

import { IApiEntity } from '../entities-definitions.interface';
import { IEntity } from '../definitions.interface';
import { Operation } from '../operation';
import { defValuesFilter } from '../util';
import { simpleEntityMapper } from '../component/connector/universal-connector.mapper'; // Move to util?

/**
 * @stable [17.01.2019]
 * @param {TEntity} changes
 * @param {TEntity} entity
 * @param {TEntity} originalEntity
 * @param {string} operationId
 * @returns {IApiEntity<TEntity extends IEntity>}
 */
export const apiEntityFactory =
  <TEntity extends IEntity = IEntity>(changes: TEntity,
                                      entity?: TEntity,
                                      originalEntity?: TEntity,
                                      operationId?: string): IApiEntity<TEntity> => {
    const entityId = entity && entity.id;
    const merger: TEntity = {
      ...entity as {},
      ...changes as {},
    } as TEntity;
    const copiedChanges = {...changes as {}} as TEntity;

    const apiEntity: IApiEntity<TEntity> = (
      R.isNil(entityId)
        ? {isNew: true, changes: copiedChanges, merger}
        : defValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
            isNew: false,
            id: entityId,
            changes: copiedChanges,
            merger,
            entity: simpleEntityMapper(entity),
            originalEntity: simpleEntityMapper(originalEntity),
          })
    ) as IApiEntity<TEntity>;
    return {
      operation: Operation.create(operationId),
      ...apiEntity,
    };
  };
