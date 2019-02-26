import * as R from 'ramda';

import { IApiEntity } from '../definition';
import { IEntity } from '../definitions.interface';
import { shallowClone, notNilValuesFilter } from '../util';

/**
 * @stable [26.02.2019]
 * @param {TEntity} changes
 * @param {TEntity} entity
 * @param {TEntity} originalEntity
 * @returns {IApiEntity<TEntity extends IEntity>}
 */
export const apiEntityFactory =
  <TEntity extends IEntity = IEntity>(changes: TEntity,
                                      entity?: TEntity,
                                      originalEntity?: TEntity): IApiEntity<TEntity> => {
    const entityId = entity && entity.id;
    const base = notNilValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      changes: shallowClone(changes),
      merger: {
        ...entity as {},
        ...changes as {},
      } as TEntity,
    });
    return notNilValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      ...R.isNil(entityId)
        ? {newEntity: true, ...base}
        : {
          entityId,
          newEntity: false,
          entity: shallowClone(entity),
          originalEntity: shallowClone(originalEntity),
          ...base,
        },
    });
  };
