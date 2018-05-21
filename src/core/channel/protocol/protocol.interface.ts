import { ObjectStatus } from './object.status';
import {
  IUuidWrapper,
  IAnyDataWrapper,
  ICommandWrapper,
  IPayloadWrapper,
  ITypeWrapper,
} from '../../definitions.interface';

/**
 * @stable [21.05.2018]
 */
export const RESPONSE_PAYLOAD_OBJECTS_CLASSES = [
  ObjectStatus
];

/**
 * @stable [21.05.2018]
 */
export interface IProtocolPayloadEntity extends ITypeWrapper,
                                                IPayloadWrapper {
}

/**
 * @stable [21.05.2018]
 */
export interface ICommandResult extends IUuidWrapper,
                                        IAnyDataWrapper,
                                        ICommandWrapper {
}
