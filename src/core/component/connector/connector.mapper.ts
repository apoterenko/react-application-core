import {
  IChannelWrapperEntity,
  IDictionariesWrapperEntity,
  ILayoutEntity,
  INotificationWrapperEntity,
  IStackWrapperEntity,
  ITransportWrapperEntity,
  IUniversalStoreEntity,
  IUserWrapperEntity,
} from '../../definition';
import {
  universalDefaultMappers,
} from './universal-connector.mapper';

export const layoutMapper = (state: ILayoutEntity): ILayoutEntity => ({
  layout: {
    ...state.layout,
  },
});

export const notificationMapper = (state: INotificationWrapperEntity): INotificationWrapperEntity => ({
  notification: {
    ...state.notification,
  },
});

export const channelMapper = (state: IChannelWrapperEntity): IChannelWrapperEntity => ({
  channel: {
    ...state.channel,
  },
});

/**
 * @stable [18.09.2018]
 * @param {IStackWrapperEntity} state
 * @returns {IStackWrapperEntity}
 */
export const stackMapper = (state: IStackWrapperEntity): IStackWrapperEntity => ({
  stack: {
    ...state.stack,
  },
});

/**
 * TODO Use mapStoreEntity
 * @deprecated
 */
export const defaultMappers = [
  ...universalDefaultMappers,
  stackMapper,
  layoutMapper,
  notificationMapper,
  channelMapper
];
