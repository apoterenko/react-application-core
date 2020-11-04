import {
  ACTION_PREFIX,
  AnyT,
} from '../definitions.interface';
import { PayloadWrapper } from './protocol';

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
export interface IChannel<TConfig = {}, TMessage = unknown> {
  connect(ip: string, config?: TConfig): void;
  disconnect(ip): void;
  onConnect(ip: string, client: IChannelClient): void;
  onDisconnect(ip: string, client: IChannelClient): void;
  onMessage(ip: string, messageName?: string, payload?: AnyT): void;
  emitEvent(ip: string, event: string, ...args: TMessage[]): void;
  emitChannelEvent(ip: string, ...args: TMessage[]): void;
  emitRequestPayload(ip: string, requestPayload: PayloadWrapper): void;
}

export const CHANNEL_CONNECT_EVENT = 'connect';
export const CHANNEL_DISCONNECT_EVENT = 'disconnect';
export const CHANNEL_SEND_EVENT = 'send';
export const CHANNEL_CONNECT_MESSAGE = 'connect';
export const CHANNEL_DISCONNECT_MESSAGE = 'disconnect';
export const $CHANNEL_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.message`;
export const $CHANNEL_DESTROY_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.destroy.message`;
export const $CHANNEL_CONNECTED_ACTION_TYPE = `${ACTION_PREFIX}channel.connected.message`;
export const $CHANNEL_DISCONNECTED_ACTION_TYPE = `${ACTION_PREFIX}channel.disconnected.message`;
