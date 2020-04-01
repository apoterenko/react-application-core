import * as React from 'react';
import { IEffectsAction } from 'redux-effects-promise';

import {
  IActivateDialogWrapper,
  IEntity,
  IFirstWrapper,
  IGoBackWrapper,
  IItemWrapper,
  ILastWrapper,
} from '../definitions.interface';
import { FieldChangeEntityT } from './field-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { IDialog } from './dialog-definition.interface';
import { IGenericContainer } from './container-definition.interface';
import { IStackItemEntity } from './stack-definition.interface';

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
  dispatchFormChange(change: FieldChangeEntityT, otherSection?: string): void;
  dispatchFormChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void;
  dispatchFormDefaultChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void;
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
    IItemWrapper<IStackItemEntity>,
    ILastWrapper {
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
  dispatchLoadDictionary<TData = {}>(dictionary: string, data?: TData);
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
