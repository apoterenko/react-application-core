import { IEffectsAction } from 'redux-effects-promise';

import {
  IActionWrapper,
  IDataWrapper,
  IDestroyWrapper,
  IDictionariesWrapper,
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
  ISectionNameWrapper,
  ISectionWrapper,
  ISelectWrapper,
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
 * @wrapper-entity
 * @stable [20.10.2019]
 */
export interface IPreviousActionWrapperEntity
  extends IPreviousActionWrapper<IEffectsAction> {
}

/**
 * @flux-entity
 * @stable [27.03.2020]
 */
export interface ISelectedFluxEntity
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
 * @generic-entity
 * @stable [14.04.2020]
 */
export interface IGenericStoreEntity<TDictionaries = {}>
  extends IChannelWrapperEntity,
    IDictionariesWrapper<TDictionaries>,
    ILayoutWrapperEntity,
    INotificationWrapperEntity,
    ISectionNameWrapper,
    IStackWrapperEntity,
    ITransportWrapperEntity,
    IUserWrapperEntity {
}

/**
 * @stable [28.09.2019]
 */
export interface IUniversalStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IGenericStoreEntity<TDictionaries>,
    IUniversalApplicationWrapperEntity,
    IPermissionsWrapperEntity<TPermissions> {
}

/**
 * @stable [28.09.2019]
 */
export interface IStoreEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions>,
    IAsyncLibsWrapperEntity {
}

/**
 * @stable [05.12.2019]
 */
export interface ISectionDataEntity<TData = IKeyValue>
  extends ISectionWrapper,
    IDataWrapper<TData> {
}
