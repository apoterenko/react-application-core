import * as React from 'react';

import {
  ILocationWrapper,
  IPropsWrapper,
  IProxyContainerWrapper,
  IQueryParamsWrapper,
  IRouteParamsWrapper,
  ISectionNameWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import {
  IContainerProps,
  IUniversalContainerProps,
} from './props-definition.interface';
import { IBaseDictionariesEntity } from './dictionary-definition.interface';
import { ILayoutWrapperEntity } from './layout-definition.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import {
  IGenericStoreEntity,
  IUniversalStoreEntity,
} from './redux-definition.interface';
import {
  IWebComponentEntity,
} from './component-definition.interface';
import {
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  INotificationStoreProxy,
  IRouterStoreProxy,
  IStoreProxy,
} from './store-proxy-definition.interface';
import { IGenericBaseComponentProps } from './generic-component-definition.interface';

/**
 * @react-native-compatible
 * @stable [23.10.2019]
 */
export const UniversalScrollableContext = React.createContext(null);

/**
 * @react-native-compatible
 * @stable [23.10.2019]
 */
export const UniversalStickyContext = React.createContext(null);

/**
 * @react-native-compatible
 * @stable [03.02.2020]
 */
export const UniversalIdProviderContext = React.createContext(null);

/**
 * @react-native-compatible
 * @stable [20.09.2019]
 */
export interface IUniversalContainerEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions>,
    INotificationWrapperEntity,
    ISectionNameWrapper,
    ITitleWrapper<string | boolean> {
}

/**
 * @stable [28.09.2019]
 */
export interface IContainerEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalContainerEntity<TDictionaries, TPermissions>,
    ILayoutWrapperEntity {
}

/**
 * @browser-compatible
 * @stable [20.09.2019]
 */
export interface IWebContainerEntity
  extends IWebComponentEntity,
    ILocationWrapper<Location>,
    IRouteParamsWrapper,
    IQueryParamsWrapper<URLSearchParams>,
    IStackWrapperEntity {
}

/**
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IUniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends React.Component<TProps, TState> {
}

/**
 * @deprecated
 */
export interface IContainer<TProps extends IContainerProps<TDictionaries, TPermissions> = IContainerProps<TDictionaries, TPermissions>,
  TState = {},
  TDictionaries = {},
  TPermissions = {}>
  extends IUniversalContainer<TProps, TState> {
}

/**
 * @deprecated
 */
export interface IUniversalContainerCtor<
  TProps extends IUniversalContainerProps<TDictionaries, TPermissions> = IUniversalContainerProps<TDictionaries, TPermissions>,
  TState = {},
  TDictionaries = {},
  TPermissions = {}>
  extends React.ComponentClass<TProps, TState> {
}

/**
 * @deprecated
 */
export interface IContainerCtor<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainerCtor<TProps, TState> {
}

/**
 * @container
 * @stable [29.02.2020]
 */
export interface IFieldsContainer
  extends IGenericContainer<IContainerProps<IBaseDictionariesEntity>> {
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericContainerEntity<TDictionaries = {}>
  extends IGenericStoreEntity<TDictionaries> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IGenericContainerProps<TDictionaries = {}>
  extends IGenericBaseComponentProps,
    IGenericContainerEntity<TDictionaries> {
}

/**
 * @container
 * @stable [30.03.2020]
 */
export interface IGenericContainer<TProps extends IGenericContainerProps<TDictionaries> = IGenericContainerProps<TDictionaries>,
  TDictionaries = {}>
  extends IPropsWrapper<TProps>,
    IStoreProxy {
  dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  dictionaryStoreProxy: IDictionaryStoreProxy;
  formStoreProxy: IFormStoreProxy;
  notificationStoreProxy: INotificationStoreProxy;
  routerStoreProxy: IRouterStoreProxy;
}

/**
 * @entity
 * @stable [05.04.2020]
 */
export interface IProxyContainerEntity<TProxyContainer extends IGenericContainer = IGenericContainer>
  extends IProxyContainerWrapper<TProxyContainer> {
}
