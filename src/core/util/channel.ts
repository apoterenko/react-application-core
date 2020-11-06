import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  IReduxChannelMessageEntity,
} from '../definition';

/**
 * @stable [06.11.2020]
 * @param message
 */
const isServiceMessage = (message: IReduxChannelMessageEntity): boolean =>
  [CHANNEL_CONNECT_EVENT, CHANNEL_DISCONNECT_EVENT].includes(message.name);

/**
 * @stable [06.11.2020]
 */
export class ChannelUtils {
  public static readonly isServiceMessage = isServiceMessage;
}
