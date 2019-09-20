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
  INotificationWrapperEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
} from '../entities-definitions.interface';
import { IChannelWrapperEntity } from './channel-definition.interface';
import { IStackWrapperEntity } from './stack-definition.interface';

/**
 * @reactNativeCompatible
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
 * @browserCompatible
 * @stable [20.09.2019]
 */
export interface IWebContainerEntity
  extends IWebComponentEntity,
    ILocationWrapper<Location>,
    IRouteParamsWrapper,
    IQueryParamsWrapper<URLSearchParams>,
    IStackWrapperEntity {
}
