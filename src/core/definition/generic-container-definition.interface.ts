import * as React from 'react';

import { IReduxStoreEntity } from './redux-definition.interface';
import {
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  IListStoreProxy,
  INotificationStoreProxy,
  IRouterStoreProxy,
  IStoreProxy,
  ITabPanelStoreProxy,
} from './store-proxy-definition.interface';
import {
  AnyT,
  ISectionNameWrapper,
} from '../definitions.interface';
import {
  IGenericBaseComponentProps,
  IGenericComponent,
} from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [12.06.2020]
 */
export interface IPresetsContainerEntity
  extends ISectionNameWrapper {
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericContainerEntity<TDictionaries = {}>
  extends IReduxStoreEntity<TDictionaries>,
    IPresetsContainerEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericContainerProps<TDictionaries = {}, TComponent = AnyT>
  extends IGenericBaseComponentProps<TComponent>,
    IGenericContainerEntity<TDictionaries> {
}

/**
 * @container
 * @stable [30.03.2020]
 */
export interface IGenericContainer<TProps extends IGenericContainerProps<TDictionaries> = IGenericContainerProps<TDictionaries>,
  TDictionaries = {}>
  extends IGenericComponent<TProps>,
    IStoreProxy {
  dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  dictionaryStoreProxy: IDictionaryStoreProxy;
  formStoreProxy: IFormStoreProxy;
  listStoreProxy: IListStoreProxy;
  notificationStoreProxy: INotificationStoreProxy;
  routerStoreProxy: IRouterStoreProxy;
  tabPanelStoreProxy: ITabPanelStoreProxy;
}

/**
 * @ctor
 * @stable [08.06.2020]
 */
export interface IGenericContainerCtor<TProps extends IGenericContainerProps = IGenericContainerProps, TState = {}>
  extends React.ComponentClass<TProps, TState> {
}
