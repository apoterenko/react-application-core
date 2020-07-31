import { IEffectsAction } from 'redux-effects-promise';

import {
  IActionWrapper,
  IDataWrapper,
  IDestroyWrapper,
  IInitialStateWrapper,
  IKeyValue,
  IListSectionWrapper,
  INextFormChangesWrapper,
  INextFormRouteWrapper,
  INextFormSectionWrapper,
  INextListSectionWrapper,
  IPreventEffectsWrapper,
  IPreviousActionWrapper,
  IPreviousFormSectionWrapper,
  IRemoteSorterWrapper,
  IReplaceRouteWrapper,
  IReplaceWrapper,
  ISectionWrapper,
  ISelectWrapper,
  IUpdateWrapper,
} from '../definitions.interface';
import { IPermissionsWrapperEntity } from './permission-definition.interface';
import { IReduxAsyncLibsHolderEntity } from './async-lib-definition.interface';
import { IReduxChannelHolderEntity } from './channel-definition.interface';
import { IReduxDictionariesHolderEntity } from './dictionary-definition.interface';
import { IReduxLayoutHolderEntity } from './layout-definition.interface';
import { IReduxNotificationHolderEntity } from './notification-definition.interface';
import { IReduxStackHolderEntity } from './stack-definition.interface';
import { IReduxTransportHolderEntity } from './transport-definition.interface';
import { IReduxUserHolderEntity } from './user-definition.interface';
import { ISelectedEntity } from './entity-definition.interface';
import { IUniversalApplicationWrapperEntity } from './application-definition.interface';

/**
 * @stable [06.04.2020]
 */
export interface IEntityActionBuilder<TValue = {}> {
  buildDestroyAction(): IEffectsAction;
  buildReplaceAction<TPayload extends TValue = TValue>(replaced: TPayload): IEffectsAction;
  buildSelectAction<TPayload extends TValue = TValue>(selected: TPayload): IEffectsAction;
  buildSelectPlainAction<TPayload extends TValue = TValue>(selected: TPayload): IEffectsAction;
  buildUpdateAction<TPayload extends TValue = TValue>(updated: TPayload): IEffectsAction;
}

/**
 * @entity
 * @stable [09.10.2019]
 */
export interface IEffectsActionEntity
  extends IActionWrapper<IEffectsAction> {
}

/**
 * @entity
 * @stable [08.06.2020]
 */
export interface IPreviousActionEntity
  extends IPreviousActionWrapper<IEffectsAction> {
}

/**
 * @flux-entity
 * @stable [08.06.2020]
 */
export interface IFluxSelectedEntity
  extends IPreventEffectsWrapper,
    IPreviousActionEntity,
    ISelectedEntity {
}

/**
 * @stable [26.08.2019]
 */
export interface IEntityReducerFactoryConfigEntity
  extends IUpdateWrapper<string>,
    IReplaceWrapper<string>,
    ISelectWrapper<string>,
    IDestroyWrapper<string>,
    IInitialStateWrapper<{}> {
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
 * @stable [18.10.2019]
 */
export interface ISortedListMiddlewareConfigEntity
  extends IListSectionWrapper,
    IRemoteSorterWrapper,
    IEffectsActionEntity {
}

/**
 * @stable [24.09.2019]
 */
export interface IStateSerializer<TState extends IStoreEntity = IStoreEntity> {
  serialize(state: TState): TState;
}

/**
 * @redux-entity
 * @stable [22.05.2020]
 */
export interface IReduxStoreEntity<TDictionaries = {}>
  extends IReduxAsyncLibsHolderEntity,
    IReduxChannelHolderEntity,
    IReduxDictionariesHolderEntity<TDictionaries>,
    IReduxLayoutHolderEntity,
    IReduxNotificationHolderEntity,
    IReduxStackHolderEntity,
    IReduxTransportHolderEntity,
    IReduxUserHolderEntity {
}

/**
 * @stable [28.09.2019]
 */
export interface IUniversalStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IReduxStoreEntity<TDictionaries>,
    IUniversalApplicationWrapperEntity,
    IPermissionsWrapperEntity<TPermissions> {
}

/**
 * @stable [28.09.2019]
 */
export interface IStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions> {
}

/**
 * @flux-entity
 * @stable [09.05.2020]
 */
export interface IFluxSectionDataEntity<TData = IKeyValue>
  extends IDataWrapper<TData>,
    ISectionWrapper {
}
