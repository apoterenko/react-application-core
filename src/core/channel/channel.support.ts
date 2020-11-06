import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  IReduxChannelMessageEntity,
} from '../definition';

/**
 * @stable [25.05.2018]
 * @param {IReduxChannelMessageEntity} message
 * @returns {any}
 */
export const isChannelServiceMessage = (message: IReduxChannelMessageEntity) =>
  [CHANNEL_CONNECT_EVENT, CHANNEL_DISCONNECT_EVENT].includes(message.name);
