import { AnyT } from '../../definitions.interface';

/**
 * @stable [23.05.2018]
 */
export class ObjectStatus {
  public static readonly $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER = 'ObjectStatus';

  public object: string;
  public status: AnyT;
}
