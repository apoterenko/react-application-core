import * as React from 'react';

import {
  ILocationWrapper,
  IQueryParamsWrapper,
  IRouteParamsWrapper,
  ISectionNameWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IChannelWrapperEntity } from './channel-definition.interface';
import { IContainerProps, IUniversalContainerProps } from './props-definition.interface';
import { IDispatchEntity } from './redux-definition.interface';
import { ILayoutWrapperEntity } from '../entities-definitions.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import { ITransportWrapperEntity } from './transport-definition.interface';
import { IUserWrapperEntity } from './user-definition.interface';
import { IWebComponentEntity } from './component-definition.interface';

/**
 * @react-native-compatible
 * @stable [20.09.2019]
 */
export interface IUniversalContainerEntity
  extends ITitleWrapper,
    ISectionNameWrapper,
    IChannelWrapperEntity,
    ILayoutWrapperEntity,
    IUserWrapperEntity,
    INotificationWrapperEntity,
    ITransportWrapperEntity {
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
