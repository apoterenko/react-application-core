import * as R from 'ramda';

import { orNull } from '../../util';
import { IGenericChannelsEntity } from '../../definition';
import { PayloadWrapper } from './payload.wrapper';
import { CommandResult } from './command.result';

/**
 * @stable [21.05.2018]
 * @param {string} ip
 * @param {IGenericChannelsEntity} channelsEntity
 * @returns {PayloadWrapper[]}
 */
export const channelsEntityResponsePayloadsMapper = (ip: string,
                                                     channelsEntity: IGenericChannelsEntity): PayloadWrapper[] => {
  const channel = channelsEntity[ip];
  return orNull<PayloadWrapper[]>(
    !R.isNil(channel) && !R.isNil(channel.messages),
    () => channel.messages.map((message) => new PayloadWrapper(message.data))
  );
};

/**
 * @stable [23.05.2018]
 * @param {string} ip
 * @param {IGenericChannelsEntity} channelsEntity
 * @param {(cResult: CommandResult) => boolean} predicate
 * @returns {CommandResult}
 */
export const findCommandResult = (ip: string,
                                  channelsEntity: IGenericChannelsEntity,
                                  predicate: (cResult: CommandResult) => boolean): CommandResult => {
  const responsePayloads = channelsEntityResponsePayloadsMapper(ip, channelsEntity);
  if (responsePayloads) {
    const responsePayload = responsePayloads
      .find((rPayload) => !R.isNil(rPayload.getCommandResult()) && predicate(rPayload.getPayload()));

    return orNull<CommandResult>(responsePayload, () => responsePayload.getCommandResult());
  }
  return null;
};

/**
 * @stable [23.05.2018]
 * @param {string} ip
 * @param {IGenericChannelsEntity} channelsEntity
 * @param {string} uuid
 * @returns {CommandResult}
 */
export const findCommandResultByUuid = (ip: string,
                                        channelsEntity: IGenericChannelsEntity,
                                        uuid: string): CommandResult =>
  findCommandResult(ip, channelsEntity, (cResult: CommandResult) => cResult.getUuid() === uuid);
