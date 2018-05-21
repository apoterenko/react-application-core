import { IKeyValue } from '../../definitions.interface';
import { BasePayload } from './base.payload';

/**
 * @stable [21.05.2018]
 */
export class RequestPayload extends BasePayload {

  /**
   * @stable [21.05.2018]
   * @param {IKeyValue} payload
   */
  constructor(payload: IKeyValue) {
    super();

    this.type = payload.constructor.name;
    this.payload = payload;
  }
}
