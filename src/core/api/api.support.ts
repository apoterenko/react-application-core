import * as R from 'ramda';

import { IApiEntity } from '../definition';
import { IEntity } from '../definitions.interface';
import { notNilValuesFilter } from '../util';

/**
 * @stable [26.02.2019]
 * @param {TEntity} changes
 * @param {TEntity} entity
 * @param {TEntity} originalEntity
 * @returns {IApiEntity<TEntity extends IEntity>}
 */
export const mapApiEntity =
  <TEntity extends IEntity = IEntity>(changes: TEntity,
                                      entity: TEntity,
                                      originalEntity?: TEntity): IApiEntity<TEntity> => {
    const entityId = entity && entity.id;
    const newEntity = R.isNil(entityId);
    const merger = {...entity as {}, ...changes as {}} as TEntity; // TODO An entity is already merged with changes
    return notNilValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      changes,
      diff: newEntity ? merger : changes,
      entity,
      entityId,
      merger,  // TODO Deprecated
      newEntity,
      originalEntity,
    });
  };
