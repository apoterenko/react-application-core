import { IEffectsAction } from 'redux-effects-promise';

import {
  IChangesWrapper,
  IEntity,
  IEntityIdTWrapper,
  IMergeStrategyWrapper,
  IPayloadWrapper,
} from '../definitions.interface';

/**
 * @entity
 * @stable [10.09.2020]
 */
export interface IModifyEntityPayloadEntity<TEntity extends IEntity = IEntity>
  extends IEntityIdTWrapper,
    IChangesWrapper<TEntity>,
    IMergeStrategyWrapper<EntityMergeStrategiesEnum> {
}

/**
 * @flux-entity
 * @stable [10.09.2020]
 */
export interface IFluxModifyEntityPayloadEntity
  extends IPayloadWrapper<IModifyEntityPayloadEntity> {
}

/**
 * @enum
 * @stable [10.09.2020]
 */
export enum EntityMergeStrategiesEnum {
  MERGE,
  OVERRIDE,
}

/**
 * @stable [10.09.2020]
 */
export interface IModifyEntityPayloadFactory {
  makeInstance(action: IEffectsAction): IFluxModifyEntityPayloadEntity;
}
