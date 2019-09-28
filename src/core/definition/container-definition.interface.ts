import * as React from 'react';

import {
  ILocationWrapper,
  IQueryParamsWrapper,
  IRouteParamsWrapper,
  ISectionNameWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IContainerProps, IUniversalContainerProps } from './props-definition.interface';
import { IDispatchEntity, IUniversalStoreEntity } from './redux-definition.interface';
import { ILayoutWrapperEntity } from './layout-definition.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import { IWebComponentEntity } from './component-definition.interface';

/**
 * @react-native-compatible
 * @stable [20.09.2019]
 */
export interface IUniversalContainerEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalStoreEntity<TDictionaries, TPermissions>,
    ITitleWrapper,
    ISectionNameWrapper {
}

/**
 * @stable [28.09.2019]
 */
export interface IContainerEntity<TDictionaries = {}, TPermissions = {}>
  extends IUniversalContainerEntity<TDictionaries, TPermissions>,
    ILayoutWrapperEntity,
    INotificationWrapperEntity {
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
  extends React.Component<TProps, TState>,
    IDispatchEntity {
}

/**
 * @stable [27.09.2019]
 */
export interface IContainer<TProps extends IContainerProps = IContainerProps, TState = {}>
  extends IUniversalContainer<TProps, TState> {
}
