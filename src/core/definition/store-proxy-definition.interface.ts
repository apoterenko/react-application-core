import * as React from 'react';

import {
  IActivateDialogWrapper,
  IFirstWrapper,
  IGoBackWrapper,
  IItemWrapper,
  IKeyValue,
  ILastWrapper,
} from '../definitions.interface';
import { FieldChangeEntityT } from './field-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { IContainer } from './container-definition.interface';
import { IDialog } from './dialog-definition.interface';
import { IDispatcher } from './dispatcher-definition.interface';
import { IStackItemEntity } from './stack-definition.interface';

/**
 * @stable [27.11.2019]
 */
export interface IDialogFormChangesConfirmStoreProxy
  extends IDispatcher,
    IActivateDialogWrapper,
    IGoBackWrapper,
    IBaseRouterStoreProxy {
  getDialogRef<T extends IDialog>(): React.RefObject<T>;
}

/**
 * @stable [09.10.2019]
 */
export interface IFormStoreProxy
  extends IDispatcher {
  dispatchFormChange(change: FieldChangeEntityT, otherSection?: string): void;
  dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void;
  dispatchFormReset(otherSection?: string): void;
  dispatchFormSubmit(apiEntity: IApiEntity, otherSection?: string): void;
  dispatchFormValid(valid: boolean, otherSection?: string): void;
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
}

/**
 * @stable [11.01.2020]
 */
export interface IDictionaryStoreProxy
  extends IDispatcher {
  dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData);
}

/**
 * @generic-container
 * @stable [29.02.2020]
 */
export interface IGenericBasicContainer {
  dictionaryStoreProxy: IDictionaryStoreProxy;
}

/**
 * @stable [18.12.2019]
 */
export type DialogFormChangesConfirmStoreProxyFactoryT = (parent: IContainer) => IDialogFormChangesConfirmStoreProxy;
export type DictionaryStoreProxyFactoryT = (parent: IContainer) => IDictionaryStoreProxy;
export type FormStoreProxyFactoryT = (parent: IContainer) => IFormStoreProxy;
export type RouterStoreProxyFactoryT = (parent: IContainer) => IRouterStoreProxy;
