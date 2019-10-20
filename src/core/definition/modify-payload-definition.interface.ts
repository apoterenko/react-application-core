import { IEffectsAction } from 'redux-effects-promise';

import {
  IChangesWrapper,
  IEntity,
  IEntityIdTWrapper,
  IMergeStrategyWrapper,
  IPayloadWrapper,
} from '../definitions.interface';

/**
 * @stable [19.10.2019]
 */
export interface IModifyEntityPayloadEntity<TEntity extends IEntity = IEntity>
  extends IEntityIdTWrapper,
    IChangesWrapper<TEntity>,
    IMergeStrategyWrapper<EntityMergeStrategiesEnum> {
}

/**
 * @stable [09.10.2019]
 */
export interface IModifyEntityPayloadWrapperEntity
  extends IPayloadWrapper<IModifyEntityPayloadEntity> {
}

/**
 * @stable [09.10.2019]
 */
export enum EntityMergeStrategiesEnum {
  MERGE,
  OVERRIDE,
}

/**
 * @stable [09.10.2019]
 */
export interface IModifyEntityPayloadFactory {
  makeInstance(action: IEffectsAction): IModifyEntityPayloadWrapperEntity;
}
