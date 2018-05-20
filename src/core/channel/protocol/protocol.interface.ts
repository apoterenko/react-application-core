import { ObjectStatus } from './object.status';
import { IPayloadWrapper, ITypeWrapper } from '../../definitions.interface';

/**
 * @stable [21.05.2018]
 */
export const PAYLOAD_OBJECTS_CLASSES = [
  ObjectStatus
];

/**
 * @stable [21.05.2018]
 */
export interface IResponsePayloadEntity extends ITypeWrapper,
                                                IPayloadWrapper {
}
