import * as React from 'react';
import { IEffectsAction } from 'redux-effects-promise';

import {
  IActivateDialogWrapper,
  IEntity,
  IFirstWrapper,
  IGoBackWrapper,
  IItemWrapper,
  ILastWrapper,
  IMiddleWrapper,
} from '../definitions.interface';
import { IApiEntity } from './api-definition.interface';
import { IDialog } from './dialog-definition.interface';
import { IGenericContainer } from './generic-container-definition.interface';
import { IReduxStackItemEntity } from './stack-definition.interface';
import { IFluxPayloadEntity } from './entity-definition.interface';

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IStoreProxy {
  dispatch<TChanges = {}>(type: string, data?: TChanges): void;
  dispatchActionByType<TData = {}>(type: string, data?: TData): void;
  dispatchPlainAction(action: IEffectsAction): void;
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IDialogFormChangesConfirmStoreProxy
  extends IActivateDialogWrapper,
    IGoBackWrapper,
    IBaseRouterStoreProxy {
  getDialogRef<T extends IDialog>(): React.RefObject<T>;
}

/**
 * @proxy
 * @stable [12.04.2020]
 */
export interface ITabPanelStoreProxy {
  dispatchTabPanelActiveValue(value: number, otherSection?: string): void;
  dispatchTabPanelDestroy(otherSection?: string): void;
  dispatchTabPanelInactiveValue(value: number, otherSection?: string): void;
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IListStoreProxy {
  dispatchListCancelLoad(otherSection?: string): void;
  dispatchListCreate(otherSection?: string): void;
  dispatchListSelect<TEntity = IEntity>(entity: TEntity, otherSection?: string): void;
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IFormStoreProxy {
  dispatchFormActiveValue(value: number, otherSection?: string): void;
  dispatchFormChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void;
  dispatchFormClear(fieldName: string, otherSection?: string): void;
  dispatchFormDefaultChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void;
  dispatchFormInactiveValue(value: number, otherSection?: string): void;
  dispatchFormReset(otherSection?: string): void;
  dispatchFormSubmit(apiEntity: IApiEntity, otherSection?: string): void;
  dispatchFormValid(valid: boolean, otherSection?: string): void;
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface INotificationStoreProxy {
  dispatchNotification(info: string);
}

/**
 * @config-entity
 * @stable [19.12.2019]
 */
export interface IRouterStoreProxyFactoryConfigEntity
  extends IFirstWrapper,
    IItemWrapper<IReduxStackItemEntity>,
    ILastWrapper,
    IMiddleWrapper {
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IBaseRouterStoreProxy {
  buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[];
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IRouterStoreProxy
  extends IBaseRouterStoreProxy,
    IGoBackWrapper {
  navigate(path: string): void;
  navigateBack(): void;
  rewrite(path: string): void;
}

/**
 * @proxy
 * @stable [30.03.2020]
 */
export interface IDictionaryStoreProxy {
  dispatchLoadDictionaryOnChange<TData = {}>(dictionary: string, payload?: IFluxPayloadEntity<TData>);
}

/**
 * @stable [30.03.2020]
 */
export type DialogFormChangesConfirmStoreProxyFactoryT = (parent: IGenericContainer) => IDialogFormChangesConfirmStoreProxy;
export type DictionaryStoreProxyFactoryT = (parent: IGenericContainer) => IDictionaryStoreProxy;
export type FormStoreProxyFactoryT = (parent: IGenericContainer) => IFormStoreProxy;
export type ListStoreProxyFactoryT = (parent: IGenericContainer) => IListStoreProxy;
export type NotificationStoreProxyFactoryT = (parent: IGenericContainer) => INotificationStoreProxy;
export type RouterStoreProxyFactoryT = (parent: IGenericContainer) => IRouterStoreProxy;
export type StoreProxyFactoryT = (parent: IGenericContainer) => IStoreProxy;
export type TabPanelStoreProxyFactoryT = (parent: IGenericContainer) => ITabPanelStoreProxy;
