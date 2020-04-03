import { IEffectsAction } from 'redux-effects-promise';

import {
  IContainerSectionWrapper,
  IDefaultChangesWrapper,
  IFormSectionWrapper,
  ILazyLoadingWrapper,
  IListAccessorWrapper,
  IListSectionWrapper,
  INextSectionWrapper,
  IPathWrapper,
  IPayloadWrapper,
  IStateWrapper,
  ITabPanelSectionWrapper,
} from '../definitions.interface';
import { IEffectsActionEntity } from './redux-definition.interface';
import { IGenericListEntity } from './list-definition.interface';

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
 * @stable [29.03.2020]
 */
export type SectionT<TState> = string | ((cfg: IActionStateEntity<TState>) => string);

/**
 * @entity
 * @stable [29.03.2020]
 */
export interface IActionStateEntity<TState = {}>
  extends IEffectsActionEntity,
    IStateWrapper<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IListMiddlewareConfigEntity<TState = {}>
  extends IListSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListMiddlewareConfigEntity<TState = {}>
  extends IActionStateEntity<TState>,
    IListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListOnTabActivateMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState>,
    ITabPanelSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface ILoadedListOnFormValidMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState>,
    IFormSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IUntouchedListMiddlewareConfigEntity<TState = {}, TDefaultChanges = {}>
  extends IContainerSectionWrapper<SectionT<TState>>,
    IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges, TState>,
    IListAccessorWrapper<(state: TState) => IGenericListEntity>,
    ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges = {}, TState = {}>
  extends IDefaultChangesWrapper<TDefaultChanges | (() => TDefaultChanges)>,
    IFormSectionWrapper<SectionT<TState>> {
}

/**
 * @config-entity
 * @stable [29.03.2020]
 */
export interface IRefreshedListMiddlewareConfigEntity<TState = {}>
  extends ILoadedListMiddlewareConfigEntity<TState> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IChainedMiddlewareConfigEntity<TState, TPayload = {}>
  extends IActionStateEntity<TState>,
    INextSectionWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPayloadWrapper<TPayload> {
}

/**
 * @config-entity
 * @stable [26.03.2020]
 */
export interface IEditedListMiddlewareConfigEntity<TPayload = {}, TState = {}, TDefaultChanges = {}>
  extends IDefaultFormChangesMiddlewareConfigEntity<TDefaultChanges, TState>,
    ILazyLoadingWrapper,
    ILoadedListMiddlewareConfigEntity<TState>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>> {
}
