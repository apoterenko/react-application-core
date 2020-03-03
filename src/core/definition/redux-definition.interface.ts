import { IEffectsAction } from 'redux-effects-promise';

import {
  AnyT,
  IActionWrapper,
  ICustomActionsWrapper,
  IDataWrapper,
  IDefaultChangesWrapper,
  IDestroyWrapper,
  IDictionariesWrapper,
  IEntity,
  IEntityWrapper,
  IErrorWrapper,
  IFormSectionWrapper,
  IFormsSectionsWrapper,
  IInitialStateWrapper,
  IKeyValue,
  ILazyLoadingWrapper,
  IListSectionWrapper,
  IListsSectionsWrapper,
  IMessageWrapper,
  INavigateBackWrapper,
  INextFormChangesWrapper,
  INextFormRouteWrapper,
  INextFormSectionWrapper,
  INextListSectionWrapper,
  INextSectionWrapper,
  IPathWrapper,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IPreviousActionWrapper,
  IPreviousFormSectionWrapper,
  IRemoteSorterWrapper,
  IReplaceRouteWrapper,
  IReplaceWrapper,
  ISectionNameWrapper,
  ISectionWrapper,
  ISelectWrapper,
  IStateWrapper,
  ISucceedTextWrapper,
  ITabPanelsSectionsWrapper,
  ITypeWrapper,
  IUpdateWrapper,
} from '../definitions.interface';
import { IAsyncLibsWrapperEntity } from './async-lib-definition.interface';
import { IChannelWrapperEntity } from './channel-definition.interface';
import { ILayoutWrapperEntity } from './layout-definition.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';
import { IPermissionsWrapperEntity } from './permission-definition.interface';
import { ISelectedEntity } from './entity-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import { ITransportWrapperEntity } from './transport-definition.interface';
import { IUniversalApplicationWrapperEntity } from './application-definition.interface';
import { IUserWrapperEntity } from './user-definition.interface';

/**
 * @stable [26.08.2019]
 */
export interface IEntityActionBuilder {
  buildDestroyAction(): IEffectsAction;
  buildReplaceAction<TValue = AnyT>(replaced: TValue): IEffectsAction;
  buildSelectAction<TValue = AnyT>(selected: TValue): IEffectsAction;
  buildUpdateAction<TValue = AnyT>(updated: TValue): IEffectsAction;
}

/**
 * @stable [27.08.2019]
 */
export enum DestroyedContainerTypesEnum {
  FORM,
  LIST,
  TAB_PANEL,
}

/**
 * @stable [09.10.2019]
 */
export interface IEffectsActionEntity
  extends IActionWrapper<IEffectsAction> {
}

/**
 * @stable [20.10.2019]
 */
export interface IPreviousActionWrapperEntity
  extends IPreviousActionWrapper<IEffectsAction> {
}

/**
 * @stable [20.10.2019]
 */
export interface ISelectEntityPayloadEntity
  extends ISelectedEntity,
    IPreventEffectsWrapper,
    IPreviousActionWrapperEntity {
}

/**
 * @stable [26.08.2019]
 */
export interface IEntityReducerFactoryConfigEntity
  extends IUpdateWrapper<string>,
    IReplaceWrapper<string>,
    ISelectWrapper<string>,
    IDestroyWrapper<string>,
    IInitialStateWrapper<AnyT> {
}

/**
 * @stable [27.08.2019]
 */
export interface IDestroyedContainerMiddlewareConfigEntity
  extends ICustomActionsWrapper<string[]>,
    IFormsSectionsWrapper<string[]>,
    IListsSectionsWrapper<string[]>,
    ISectionNameWrapper,
    ITabPanelsSectionsWrapper<string[]>,
    ITypeWrapper<DestroyedContainerTypesEnum> {
}

/**
 * @stable [28.08.2019]
 */
export interface IChainedFormMiddlewareConfigEntity<TChanges>
  extends INextFormSectionWrapper,
    IPreviousFormSectionWrapper,
    INextFormChangesWrapper<TChanges>,
    INextFormRouteWrapper,
    INextListSectionWrapper,
    IReplaceRouteWrapper {
}

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
 * @stable [19.10.2019]
 */
export interface IChainedMiddlewareConfigEntity<TState, TPayload = AnyT>
  extends INextSectionWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IStateWrapper<TState>,
    IEffectsActionEntity,
    IPayloadWrapper<TPayload> {
}

/**
 * @stable [29.11.2019]
 */
export interface INotificationErrorMiddlewareConfigEntity
  extends IEffectsActionEntity,
    IErrorWrapper<boolean | string> {
}

/**
 * @stable [29.11.2019]
 */
export interface INotificationInfoMiddlewareConfigEntity
  extends IEffectsActionEntity,
    IMessageWrapper {
}

/**
 * @stable [09.10.2019]
 */
export interface IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>
  extends IFormSectionWrapper,
    IListSectionWrapper,
    IStateWrapper<TState>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TEntity>>,
    IEffectsActionEntity,
    ILazyLoadingWrapper,
    IEntityWrapper<TEntity>,
    IDefaultChangesWrapper<TEntity> {
}

/**
 * @stable [18.10.2019]
 */
export interface ISortedListMiddlewareConfigEntity
  extends IListSectionWrapper,
    IRemoteSorterWrapper,
    IEffectsActionEntity {
}

/**
 * @stable [04.10.2019]
 */
export interface ISucceedFormMiddlewareConfigEntity
  extends ISucceedTextWrapper,
    IFormSectionWrapper,
    INavigateBackWrapper {
}

/**
 * @stable [09.10.2019]
 */
export interface ISucceedListFormMiddlewareConfigEntity
  extends IEffectsActionEntity,
    IFormSectionWrapper,
    IListSectionWrapper,
    INavigateBackWrapper,
    ISucceedTextWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface IStateSerializer<TState extends IStoreEntity = IStoreEntity> {
  serialize(state: TState): TState;
}

/**
 * @stable [28.09.2019]
 */
export interface IUniversalStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalApplicationWrapperEntity,
    IUserWrapperEntity,
    IStackWrapperEntity,
    IChannelWrapperEntity,
    ITransportWrapperEntity,
    IPermissionsWrapperEntity<TPermissions>,
    IDictionariesWrapper<TDictionaries> {
}

/**
 * @stable [28.09.2019]
 */
export interface IStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions>,
    IAsyncLibsWrapperEntity,
    ILayoutWrapperEntity,
    INotificationWrapperEntity {
}

/**
 * @stable [05.12.2019]
 */
export interface ISectionDataEntity<TData = IKeyValue>
  extends ISectionWrapper,
    IDataWrapper<TData> {
}
