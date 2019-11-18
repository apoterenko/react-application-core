import { IEffectsAction } from 'redux-effects-promise';

import {
  AnyT,
  IActionWrapper,
  ICustomActionsWrapper,
  IDestroyWrapper,
  IDictionariesWrapper,
  IEntity,
  IEntityWrapper,
  IFormSectionWrapper,
  IFormsSectionsWrapper,
  IInitialStateWrapper,
  IKeyValue,
  ILazyLoadingWrapper,
  IListSectionWrapper,
  IListsSectionsWrapper,
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
  ISelectWrapper,
  IStateWrapper,
  ISucceedMessageWrapper,
  ITypeWrapper,
  IUpdateWrapper,
} from '../definitions.interface';
import { IApplicationWrapperEntity } from './application-definition.interface';
import { IChannelWrapperEntity } from './channel-definition.interface';
import { ILayoutWrapperEntity } from './layout-definition.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';
import { IPermissionsWrapperEntity } from './permission-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import { ITransportWrapperEntity } from './transport-definition.interface';
import { IUserWrapperEntity } from './user-definition.interface';
import { ISelectedWrapperEntity } from './entity-definition.interface';

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
  LIST,
  FORM,
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
  extends ISelectedWrapperEntity,
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
  extends ISectionNameWrapper,
    ITypeWrapper<DestroyedContainerTypesEnum>,
    IListsSectionsWrapper<string[]>,
    IFormsSectionsWrapper<string[]>,
    ICustomActionsWrapper<string[]> {
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
export interface IChainedMiddlewareConfigEntity<TState, TPayload>
  extends INextSectionWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TPayload>>,
    IStateWrapper<TState>,
    IEffectsActionEntity,
    IPayloadWrapper<TPayload> {
}

/**
 * @stable [09.10.2019]
 */
export interface IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>
  extends IFormSectionWrapper<string | ((entity: TEntity, state: TState, action: IEffectsAction) => string)>,
    IListSectionWrapper,
    IStateWrapper<TState>,
    IPathWrapper<ChainedMiddlewarePayloadT<TState, TEntity>>,
    IEffectsActionEntity,
    ILazyLoadingWrapper,
    IEntityWrapper<TEntity> {
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
  extends ISucceedMessageWrapper,
    IFormSectionWrapper,
    INavigateBackWrapper {
}

/**
 * @stable [09.10.2019]
 */
export interface ISucceedListFormMiddlewareConfigEntity
  extends INavigateBackWrapper,
    IEffectsActionEntity,
    IListSectionWrapper,
    IFormSectionWrapper,
    ISucceedMessageWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface IStateSerializer<TState extends IStoreEntity = IStoreEntity> {
  serialize(state: TState): TState;
}

/**
 * @stable [27.09.2019]
 */
export interface IDispatchEntity {
  dispatch?<TChanges = IKeyValue>(type: string, data?: TChanges): void;
  dispatchCustomType?<TData = IKeyValue>(type: string, data?: TData): void;
  dispatchFormChange?(fieldName: string, fieldValue?: AnyT, otherSection?: string): void;
  dispatchFormChanges?<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void;
  dispatchFormSubmit?(): void;
  dispatchFrameworkAction?<TData = IKeyValue>(type: string, data?: TData, otherSection?: string): void;
  dispatchListCreate?(): void;
  dispatchLoadDictionary?<TData = IKeyValue>(dictionary: string, data?: TData): void;
}

/**
 * @stable [28.09.2019]
 */
export interface IUniversalStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IApplicationWrapperEntity,
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
    ILayoutWrapperEntity,
    INotificationWrapperEntity {
}
