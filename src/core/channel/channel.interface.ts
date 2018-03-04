import { CommandsPayload } from './command';
import {
  ACTION_PREFIX,
  AnyT,
  IIpWrapper,
  IAnyDataWrapper,
  IChannelWrapper,
  IStringChannelWrapper,
  INameWrapper,
  IMessagesWrapper,
} from '../definition.interface';

export interface IApplicationChannelMessage extends IIpWrapper,
                                                    INameWrapper,
                                                    IStringChannelWrapper,
                                                    IAnyDataWrapper {
}

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
  emitCommands(channel: string, event: string, payload: CommandsPayload): void;
  emitChannelCommands(channel: string, payload: CommandsPayload): void;
}

export interface IApplicationChannelState extends IMessagesWrapper<IApplicationChannelMessage[]> {
}

export interface IApplicationChannelWrapperState extends IChannelWrapper<IApplicationChannelState> {
}

export const INITIAL_APPLICATION_CHANNEL_STATE: IApplicationChannelState = {
  messages: [],
};

export const CHANNEL_CONNECT_MESSAGE = 'connect';
export const CHANNEL_MESSAGE_ACTION_TYPE = `${ACTION_PREFIX}channel.message`;
