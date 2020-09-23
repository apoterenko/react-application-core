import * as R from 'ramda';

import {
  EntityMergeStrategiesEnum,
  IModifyEntity,
} from '../definition';
import { IEntity } from '../definitions.interface';
import { CloneUtils } from './clone';

/**
 * @stable [19.10.2019]
 * @param {EntityMergeStrategiesEnum} mergeStrategy
 * @returns {EntityMergeStrategiesEnum}
 */
export const getActualMergeStrategy = (mergeStrategy: EntityMergeStrategiesEnum): EntityMergeStrategiesEnum =>
  (R.isNil(mergeStrategy) || mergeStrategy === EntityMergeStrategiesEnum.MERGE)
    ? EntityMergeStrategiesEnum.MERGE
    : EntityMergeStrategiesEnum.OVERRIDE;

/**
 * @stable [19.10.2019]
 * @param {IModifyEntity<TEntity extends IEntity>} payload
 * @param {TEntity} entity
 * @returns {TEntity}
 */
export const buildEntityByMergeStrategy =
  <TEntity extends IEntity = IEntity>(payload: IModifyEntity<TEntity>, entity?: TEntity): TEntity => (
    getActualMergeStrategy(payload.mergeStrategy) === EntityMergeStrategiesEnum.OVERRIDE
      ? CloneUtils.shallowClone(payload.changes)
      : Object.assign({}, entity || {}, payload.changes)
  );
