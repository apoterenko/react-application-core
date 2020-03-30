import * as React from 'react';
import { IEffectsAction } from 'redux-effects-promise';

import {
  IActivateDialogWrapper,
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
  dispatchAnyAction(action: IEffectsAction): void;
  dispatchCustomType<TData = {}>(type: string, data?: TData): void;
}

/**
 * @stable [27.11.2019]
 */
export interface IDialogFormChangesConfirmStoreProxy
  extends IStoreProxy,
    IActivateDialogWrapper,
    IGoBackWrapper,
    IBaseRouterStoreProxy {
  getDialogRef<T extends IDialog>(): React.RefObject<T>;
}

/**
 * @stable [09.10.2019]
 */
export interface IFormStoreProxy
  extends IStoreProxy {
  dispatchFormChange(change: FieldChangeEntityT, otherSection?: string): void;
  dispatchFormChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void;
  dispatchFormReset(otherSection?: string): void;
  dispatchFormSubmit(apiEntity: IApiEntity, otherSection?: string): void;
  dispatchFormValid(valid: boolean, otherSection?: string): void;
}

/**
 * @stable [30.03.2020]
 */
export interface INotificationStoreProxy {
  dispatchNotification(info: string);
}

/**
 * @stable [19.12.2019]
 */
export interface IRouterStoreProxyFactoryConfigEntity
  extends IFirstWrapper,
    IItemWrapper<IStackItemEntity>,
    ILastWrapper {
}

/**
 * @stable [19.12.2019]
 */
export interface IBaseRouterStoreProxy {
  buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[];
}

/**
 * @stable [19.12.2019]
 */
export interface IRouterStoreProxy
  extends IBaseRouterStoreProxy,
    IGoBackWrapper {
  navigate(path: string): void;
  navigateBack(): void;
  rewrite(path: string): void;
}

/**
 * @stable [11.01.2020]
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
export type RouterStoreProxyFactoryT = (parent: IGenericContainer) => IRouterStoreProxy;
export type NotificationStoreProxyFactoryT = (parent: IGenericContainer) => INotificationStoreProxy;
export type StoreProxyFactoryT = (parent: IGenericContainer) => IStoreProxy;
