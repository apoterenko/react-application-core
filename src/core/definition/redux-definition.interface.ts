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
  IPathWrapper,
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

/**
 * @stable [09.10.2019]
 */
export interface IEffectsActionEntity
  extends IActionWrapper<IEffectsAction> {
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
 * @stable [26.08.2019]
 */
export interface IEntityActionBuilder {
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
 * @stable [09.10.2019]
 */
export interface IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>
  extends IFormSectionWrapper<string | ((entity: TEntity, state: TState, action: IEffectsAction) => string)>,
    IListSectionWrapper,
    IStateWrapper<TState>,
    IPathWrapper<string | ((entity: TEntity, state: TState, action: IEffectsAction) => string)>,
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
export interface ISucceedRelatedFormMiddlewareConfigEntity
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
