import { IApplicationChannelWrapperState } from './channel.interface';
import { CommandResult, ICommandResult } from './command';
import { orNull } from '../util';

export const findChannelMessage = (uuid: string,
                                   state: IApplicationChannelWrapperState) =>
  state.channel.messages.find((message) => message.data && message.data.uuid === uuid);

export const findCommandResult = (uuid: string,
                                  state: IApplicationChannelWrapperState): CommandResult => {
  const message = findChannelMessage(uuid, state);
  const messageData: ICommandResult = message && message.data;
  return orNull(message, () => new CommandResult(messageData.command, messageData.uuid, messageData.data));
};
