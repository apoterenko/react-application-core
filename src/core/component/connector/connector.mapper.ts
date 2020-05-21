import {
  IChannelWrapperEntity,
  IDictionariesEntity,
  IReduxHolderLayoutEntity,
  INotificationWrapperEntity,
  IReduxHolderStackEntity,
  ITransportWrapperEntity,
  IUniversalStoreEntity,
  IReduxHolderUserEntity,
} from '../../definition';
import {
  universalDefaultMappers,
} from './universal-connector.mapper';

export const layoutMapper = (state: IReduxHolderLayoutEntity): IReduxHolderLayoutEntity => ({
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
 * @param {IReduxHolderStackEntity} state
 * @returns {IReduxHolderStackEntity}
 */
export const stackMapper = (state: IReduxHolderStackEntity): IReduxHolderStackEntity => ({
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
