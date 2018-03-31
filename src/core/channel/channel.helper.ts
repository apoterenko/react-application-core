import { CommandResult, ICommandResult } from './command';
import { orNull } from '../util';
import { IChannelWrapperEntity } from '../entities-definitions.interface';

export const findChannelMessage = (uuid: string,
                                   state: IChannelWrapperEntity) =>
  state.channel.messages.find((message) => message.data && message.data.uuid === uuid);

export const findCommandResult = (uuid: string,
                                  state: IChannelWrapperEntity): CommandResult => {
  const message = findChannelMessage(uuid, state);
  const messageData: ICommandResult = message && message.data;
  return orNull(message, () => new CommandResult(messageData.command, messageData.uuid, messageData.data));
};
