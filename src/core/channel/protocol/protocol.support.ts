import * as R from 'ramda';

import { orNull } from '../../util';
import { IChannelsEntity } from '../../entities-definitions.interface';
import { ResponsePayload } from './response.payload';
import { ObjectStatus } from './object.status';

/**
 * @stable [21.05.2018]
 * @param {string} ip
 * @param {IChannelsEntity} channelsEntity
 * @returns {ResponsePayload[]}
 */
export const channelsEntityResponsePayloadsMapper = (ip: string,
                                                     channelsEntity: IChannelsEntity): ResponsePayload[] => {
  const channel = channelsEntity[ip];
  return orNull<ResponsePayload[]>(
    !R.isNil(channel) && !R.isNil(channel.messages),
    () => channel.messages.map((message) => new ResponsePayload(message.data))
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
