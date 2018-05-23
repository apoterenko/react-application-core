import * as R from 'ramda';

import { orNull } from '../../util';
import { IChannelsEntity } from '../../entities-definitions.interface';
import { RequestPayload } from './request.payload';
import { ObjectStatus } from './object.status';
import { CommandResult } from './command.result';

/**
 * @stable [21.05.2018]
 * @param {string} ip
 * @param {IChannelsEntity} channelsEntity
 * @returns {RequestPayload[]}
 */
export const channelsEntityResponsePayloadsMapper = (ip: string,
                                                     channelsEntity: IChannelsEntity): RequestPayload[] => {
  const channel = channelsEntity[ip];
  return orNull<RequestPayload[]>(
    !R.isNil(channel) && !R.isNil(channel.messages),
    () => channel.messages.map((message) => new RequestPayload(message.data))
  );
};

/**
 * @stable [21.05.2018]
 * @param {string} ip
 * @param {IChannelsEntity} channelsEntity
 * @param {(oStatus: ObjectStatus) => boolean} predicate
 * @returns {ObjectStatus}
 */
export const findLastObjectStatus = (ip: string,
                                     channelsEntity: IChannelsEntity,
                                     predicate: (oStatus: ObjectStatus) => boolean): ObjectStatus => {
  const responsePayloads = channelsEntityResponsePayloadsMapper(ip, channelsEntity);
  if (responsePayloads) {
    const responsePayload = responsePayloads
      .reverse()
      .find((rPayload) => !R.isNil(rPayload.getObjectStatus()) && predicate(rPayload.getPayload()));

    return orNull<ObjectStatus>(responsePayload, () => responsePayload.getObjectStatus());
  }
  return null;
};

/**
 * @stable [23.05.2018]
 * @param {string} ip
 * @param {IChannelsEntity} channelsEntity
 * @param {(cResult: CommandResult) => boolean} predicate
 * @returns {CommandResult}
 */
export const findCommandResult = (ip: string,
                                  channelsEntity: IChannelsEntity,
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
 * @param {IChannelsEntity} channelsEntity
 * @param {string} uuid
 * @returns {CommandResult}
 */
export const findCommandResultByUuid = (ip: string,
                                        channelsEntity: IChannelsEntity,
                                        uuid: string): CommandResult =>
  findCommandResult(ip, channelsEntity, (cResult: CommandResult) => cResult.getUuid() === uuid);
