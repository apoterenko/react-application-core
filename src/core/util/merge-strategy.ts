import * as R from 'ramda';

import {
  EntityMergeStrategiesEnum,
  IModifyEntityPayloadEntity,
} from '../definition';
import { IEntity } from '../definitions.interface';
import { shallowClone } from './clone';

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
 * @param {IModifyEntityPayloadEntity<TEntity extends IEntity>} payload
 * @param {TEntity} entity
 * @returns {TEntity}
 */
export const buildEntityByMergeStrategy =
  <TEntity extends IEntity = IEntity>(payload: IModifyEntityPayloadEntity<TEntity>, entity?: TEntity): TEntity => (
    getActualMergeStrategy(payload.mergeStrategy) === EntityMergeStrategiesEnum.OVERRIDE
      ? shallowClone(payload.changes)
      : Object.assign({}, entity || {}, payload.changes)
  );
