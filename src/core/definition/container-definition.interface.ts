import {
  ILocationWrapper,
  IQueryParamsWrapper,
  IRouteParamsWrapper,
  ISectionNameWrapper,
  ITitleWrapper,
} from '../definitions.interface';
import { IWebComponentEntity } from './component-definition.interface';
import {
  ILayoutWrapperEntity,
  IUserWrapperEntity,
} from '../entities-definitions.interface';
import { IChannelWrapperEntity } from './channel-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';
import { ITransportWrapperEntity } from './transport-definition.interface';
import { INotificationWrapperEntity } from './notification-definition.interface';

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
