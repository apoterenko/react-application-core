import {
  IChannelWrapperEntity,
  IDictionariesWrapperEntity,
  ILayoutWrapperEntity,
  INotificationWrapperEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  IStackWrapperEntity,
  ITransportWrapperEntity,
  IUniversalStoreEntity,
  IUserWrapperEntity,
} from '../../definition';
import {
  universalDefaultMappers,
} from './universal-connector.mapper';

export const layoutMapper = (state: ILayoutWrapperEntity): ILayoutWrapperEntity => ({
  layout: {
    ...state.layout,
  },
});

export const filterMapper = (filterState: IQueryFilterEntity) => ({
  filter: {
    ...filterState,
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
 * @deprecated Use mapQueryFilterEntity
 */
export const filterWrapperMapper = (filterState: IQueryFilterWrapperEntity) =>
    filterMapper(filterState.filter);

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

export const defaultMappers = [
  ...universalDefaultMappers,
  stackMapper,
  layoutMapper,
  notificationMapper,
  channelMapper
];
