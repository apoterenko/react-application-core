import * as React from 'react';

import {
  ILocationWrapper,
  IProxyContainerWrapper,
  IQueryParamsWrapper,
  IRouteParamsWrapper,
  ISectionNameWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IUniversalContainerProps } from './props-definition.interface';
import { IReduxLayoutHolderEntity } from './layout-definition.interface';
import { IReduxNotificationHolderEntity } from './notification-definition.interface';
import { IReduxStackHolderEntity } from './stack-definition.interface';
import { IUniversalStoreEntity } from './redux-definition.interface';
import { IWebComponentEntity } from './component-definition.interface';
import { IGenericContainer } from './generic-container-definition.interface';

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
    IReduxNotificationHolderEntity,
    ISectionNameWrapper,
    ITitleWrapper<string | boolean> {
}

/**
 * @stable [28.09.2019]
 */
export interface IContainerEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalContainerEntity<TDictionaries, TPermissions>,
    IReduxLayoutHolderEntity {
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
    IReduxStackHolderEntity {
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
 * @holder-entity
 * @stable [01.08.2020]
 */
export interface IProxyContainerHolderEntity<TContainer extends IGenericContainer = IGenericContainer>
  extends IProxyContainerWrapper<TContainer> {
}
