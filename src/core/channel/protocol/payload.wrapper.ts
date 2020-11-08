import * as R from 'ramda';

import { TypeUtils } from '../../util/type';
import { IKeyValue, AnyT } from '../../definitions.interface';
import { ObjectStatus } from './object.status';
import { CommandResult } from './command.result';
import {
  $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER,
  IProtocolPayloadEntity,
  RESPONSE_PAYLOAD_OBJECTS_CLASSES,
} from './protocol.interface';
import { ConditionUtils } from '../../util/cond';

/**
 * @stable [24.05.2018]
 */
export class PayloadWrapper {
  private type: string;
  private payload: AnyT;

  /**
   * @stable [24.05.2018]
   * @param {IKeyValue | IProtocolPayloadEntity} payload
   */
  constructor(payload: IKeyValue | IProtocolPayloadEntity) {
    const payloadAsProtocolEntity = payload as IProtocolPayloadEntity;

    if (Object.keys(payload).length === 2
      && TypeUtils.isString(payloadAsProtocolEntity.type)
      && !R.isNil(payloadAsProtocolEntity.payload)) {

      // Response
      this.type = payloadAsProtocolEntity.type;

      const payloadClass = RESPONSE_PAYLOAD_OBJECTS_CLASSES.find((ctor) =>
        Reflect.get(ctor, $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER) === payloadAsProtocolEntity.type);

      if (payloadClass) {
        this.payload = Object.assign(new payloadClass(), payloadAsProtocolEntity.payload);
      } else {
        this.payload = payloadAsProtocolEntity.payload;
      }
    } else {

      // Request
      this.type = Reflect.get(payload.constructor, $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER);
      this.payload = payload;
    }
  }

  /**
   * @stable [21.05.2018]
   * @returns {ObjectStatus}
   */
  public getObjectStatus(): ObjectStatus {
    return ConditionUtils.orNull<ObjectStatus>(
      this.payload instanceof ObjectStatus,
      this.payload as ObjectStatus
    );
  }

  /**
   * @stable [08.11.2020]
   */
  public getCommandResult<TData = {}>(): CommandResult<TData> {
    return ConditionUtils.orNull(
      this.payload instanceof CommandResult,
      this.payload as CommandResult<TData>
    );
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
   * @returns {string}
   */
  public getType(): string {
    return this.type;
  }
}
