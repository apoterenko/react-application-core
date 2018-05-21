import { orNull } from '../../util';
import { ObjectStatus } from './object.status';
import { IProtocolPayloadEntity, RESPONSE_PAYLOAD_OBJECTS_CLASSES } from './protocol.interface';
import { BasePayload } from './base.payload';

/**
 * @stable [21.05.2018]
 */
export class ResponsePayload extends BasePayload {

  /**
   * @stable [21.05.2018]
   * @param {IProtocolPayloadEntity} protocolPayload
   */
  constructor(protocolPayload: IProtocolPayloadEntity) {
    super();
    this.type = protocolPayload.type;

    const payloadClass = RESPONSE_PAYLOAD_OBJECTS_CLASSES.find((ctor) => ctor.name === protocolPayload.type);
    if (payloadClass) {
      this.payload = Object.assign(new payloadClass(), protocolPayload.payload);
    } else {
      this.payload = protocolPayload.payload;
    }
  }

  /**
   * @stable [21.05.2018]
   * @returns {ObjectStatus}
   */
  public getObjectStatus(): ObjectStatus {
    return orNull<ObjectStatus>(
      this.payload instanceof ObjectStatus,
      this.payload as ObjectStatus
    );
  }
}
