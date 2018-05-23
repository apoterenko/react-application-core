import { orNull } from '../../util';
import { ObjectStatus } from './object.status';
import { BasePayload } from './base.payload';
import {
  $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER,
  IProtocolPayloadEntity,
  RESPONSE_PAYLOAD_OBJECTS_CLASSES,
} from './protocol.interface';
import { CommandResult } from './command.result';

/**
 * @stable [21.05.2018]
 */
export class ResponsePayload extends BasePayload {

  /**
   * @stable [23.05.2018]
   * @param {IProtocolPayloadEntity} protocolPayload
   */
  constructor(protocolPayload: IProtocolPayloadEntity) {
    super();
    this.type = protocolPayload.type;

    const payloadClass = RESPONSE_PAYLOAD_OBJECTS_CLASSES.find((ctor) =>
      Reflect.get(ctor, $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER) === protocolPayload.type);

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

  /**
   * @stable [23.05.2018]
   * @returns {CommandResult}
   */
  public getCommandResult(): CommandResult {
    return orNull<CommandResult>(
      this.payload instanceof CommandResult,
      this.payload as CommandResult
    );
  }
}
