import { CommandResult, ICommandResult } from './command';
import { orNull } from '../util';
import { IChannelWrapperEntity, IChannelMessageEntity } from '../entities-definitions.interface';

export const findChannelMessage = (ip: string,
                                   uuid: string,
                                   state: IChannelWrapperEntity): IChannelMessageEntity => {
  const channel = state.channel[ip];
  return channel ? channel.messages.find((message) => message.data && message.data.uuid === uuid) : null;
};

export const findCommandResult = (ip: string,
                                  uuid: string,
                                  state: IChannelWrapperEntity): CommandResult => {
  const message = findChannelMessage(ip, uuid, state);
  const messageData: ICommandResult = message && message.data;
  return orNull(message, () => new CommandResult(messageData.command, messageData.uuid, messageData.data));
};
