import { IEffectsAction } from 'redux-effects-promise';

import {
  IChangesWrapper,
  IEntity,
  IEntityIdTWrapper,
  IMergeStrategyWrapper,
  ISelectedByDefaultWrapper,
} from '../definitions.interface';
import { IFluxEntity } from './flux-definition.interface';

/**
 * @entity
 * @stable [23.09.2020]
 */
export interface IModifyEntity<TEntity = IEntity>
  extends IChangesWrapper<TEntity>,
    IEntityIdTWrapper,
    IMergeStrategyWrapper<EntityMergeStrategiesEnum>,
    ISelectedByDefaultWrapper {
}

/**
 * @flux-entity
 * @stable [23.09.2020]
 */
export interface IFluxModifyEntity<TEntity = IEntity>
  extends IFluxEntity<IModifyEntity<TEntity>> {
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
export interface IModifyEntityFactory {
  makeInstance(action: IEffectsAction): IModifyEntity;
}
