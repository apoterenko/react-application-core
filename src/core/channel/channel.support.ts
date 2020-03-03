import { IChannelMessageEntity } from '../definition';
import {
  CHANNEL_CONNECT_MESSAGE,
  CHANNEL_DISCONNECT_MESSAGE,
} from './channel.interface';

/**
 * @stable [25.05.2018]
 * @param {IChannelMessageEntity} message
 * @returns {any}
 */
export const isChannelServiceMessage = (message: IChannelMessageEntity) =>
  [CHANNEL_CONNECT_MESSAGE, CHANNEL_DISCONNECT_MESSAGE].includes(message.name);
