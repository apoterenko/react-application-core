import {
  ACTION_PREFIX,
  AnyT,
} from '../definitions.interface';
import { IChannelsEntity } from '../entities-definitions.interface';
import { RequestPayload } from './protocol';

/**
 * @stable [21.05.2018]
 */
export interface IChannelClient {
  on(event: string, callback: (...args: AnyT[]) => void): void;
  emit(event: string, ...args: AnyT[]): void;
  close(): void;
}

/**
 * @stable [21.05.2018]
 */
export interface IChannelService {
  connect(ip: string, config?: AnyT): void;
  disconnect(ip): void;
  onConnect(ip: string, client: IChannelClient): void;
  onDisconnect(ip: string, client: IChannelClient): void;
  onMessage(ip: string, client: IChannelClient, name: string, message?: string): void;
  emitEvent(ip: string, event: string, ...messages: AnyT[]): void;
  emitChannelEvent(ip: string, ...messages: AnyT[]): void;
  emitRequestPayload(ip: string, requestPayload: RequestPayload): void;
}

/**
 * @stable [20.05.2018]
 */
export const INITIAL_APPLICATION_CHANNEL_STATE: IChannelsEntity = {
};

export const CHANNEL_CONNECT_MESSAGE = 'connect';
export const CHANNEL_DISCONNECT_MESSAGE = 'disconnect';
export const CHANNEL_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.message`;
