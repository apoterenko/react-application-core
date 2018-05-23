import { ObjectStatus } from './object.status';
import {
  IPayloadWrapper,
  ITypeWrapper,
} from '../../definitions.interface';

import { CommandResult } from './command.result';

/**
 * @stable [21.05.2018]
 */
export const RESPONSE_PAYLOAD_OBJECTS_CLASSES = [
  ObjectStatus,
  CommandResult
];

/**
 * @stable [21.05.2018]
 */
export interface IProtocolPayloadEntity extends ITypeWrapper,
                                                IPayloadWrapper {
}

/**
 * @stable [23.05.2018]
 */
export const $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER = '$PROTOCOL_PAYLOAD_CLASS_IDENTIFIER';
