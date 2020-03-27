import { IEffectsAction } from 'redux-effects-promise';

import {
  AnyT,
  IDefaultChangesWrapper,
  IEntity,
  IFormSectionWrapper,
  IKeyValue,
  ILazyLoadingWrapper,
  IListAccessorWrapper,
  IListSectionWrapper,
  INextSectionWrapper,
  IPathWrapper,
  IPayloadWrapper,
  IStateWrapper,
} from '../definitions.interface';
import { IEffectsActionEntity } from './redux-definition.interface';
import { IListEntity } from './list-definition.interface';

/**
 * @stable [19.10.2019]
 */
export type ChainedMiddlewarePayloadFnT<TState, TPayload> =
  ((payload: TPayload, state: TState, action: IEffectsAction) => string);

/**
 * @stable [19.10.2019]
 */
export type ChainedMiddlewarePayloadT<TState, TPayload> = string | ChainedMiddlewarePayloadFnT<TState, TPayload>;

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IDefaultFormChangesMiddlewareConfigEntity<TChanges extends IKeyValue = IKeyValue, TState = {}>
  extends IFormSectionWrapper,
    IDefaultChangesWrapper<TChanges | (() => TChanges)> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IChainedMiddlewareConfigEntity<TState, TPayload = AnyT>
  extends IEffectsActionEntity,
    INextSectionWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPayloadWrapper<TPayload>,
    IStateWrapper<TState> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>
  extends IDefaultFormChangesMiddlewareConfigEntity<TEntity, TState>,
    IEffectsActionEntity,
    ILazyLoadingWrapper,
    IListSectionWrapper,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TEntity>>,
    IStateWrapper<TState> {
}

/**
 * @config-entity
 * @stable [27.03.2020]
 */
export interface IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges = {}>
  extends IDefaultFormChangesMiddlewareConfigEntity<TDefaultFormChanges, TState>,
    IListAccessorWrapper<(state: TState) => IListEntity>,
    IListSectionWrapper {
}
