import { Command } from './command';
import {
  ACTION_PREFIX,
  AnyT,
} from '../definition.interface';
import { IChannelMessagesWrapperEntity } from '../entities-definitions.interface';

export interface IApplicationChannelClient {
  on(event: string, callback: (...args: AnyT[]) => void): void;
  emit(event: string, ...args: AnyT[]): void;
}

export interface IApplicationChannel {
  connect(ip: string, channel: string): void;
  onConnect(ip: string, channel: string, client: IApplicationChannelClient): void;
  onMessage(ip: string, channel: string, client: IApplicationChannelClient, name: string, message?: string): void;
  emitEvent(channel: string, event: string, ...messages: AnyT[]): void;
  emitChannelEvent(channel: string, ...messages: AnyT[]): void;
  emitCommand(channel: string, event: string, command: Command): void;
  emitChannelCommand(channel: string, command: Command): void;
}

/* @stable - 31.03.2018 */
export const INITIAL_APPLICATION_CHANNEL_STATE: IChannelMessagesWrapperEntity = {
  messages: [],
};

export const CHANNEL_CONNECT_MESSAGE = 'connect';
export const CHANNEL_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.message`;
