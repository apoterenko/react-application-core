import { orNull } from '../../util';
import { AnyT } from '../../definitions.interface';
import { ObjectStatus } from './object.status';
import { IResponsePayloadEntity, PAYLOAD_OBJECTS_CLASSES } from './protocol.interface';

/**
 * @stable [21.05.2018]
 */
export class ResponsePayload {
  private payload: AnyT;

  /**
   * @stable [21.05.2018]
   * @param {IResponsePayloadEntity} responsePayload
   */
  constructor(responsePayload: IResponsePayloadEntity) {
    const payloadClass = PAYLOAD_OBJECTS_CLASSES.find((ctor) => ctor.name === responsePayload.type);
    if (payloadClass) {
      this.payload = Object.assign(new payloadClass(), responsePayload.payload);
    } else {
      this.payload = responsePayload.payload;
    }
  }

  /**
   * @stable [21.05.2018]
   * @returns {AnyT}
   */
  public getPayload(): AnyT {
    return this.payload;
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
