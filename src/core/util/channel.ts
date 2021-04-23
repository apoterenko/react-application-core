import {
  CHANNEL_CONNECT_EVENT,
  CHANNEL_DISCONNECT_EVENT,
  IReduxChannelMessageEntity,
  IReduxChannelsEntity,
} from '../definition';

/**
 * @stable [06.11.2020]
 * @param message
 */
const isServiceMessage = (message: IReduxChannelMessageEntity): boolean =>
  [CHANNEL_CONNECT_EVENT, CHANNEL_DISCONNECT_EVENT].includes(message.name);

/**
 * @stable [22.04.2021]
 * @param channelsEntity
 * @param ip
 */
const isConnected = (channelsEntity: IReduxChannelsEntity, ip: string): boolean =>
  channelsEntity[ip]?.connected;

/**
 * @stable [06.11.2020]
 */
export class ChannelUtils {
  public static readonly isConnected = isConnected;
  public static readonly isServiceMessage = isServiceMessage;
}
