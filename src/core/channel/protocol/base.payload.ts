import { AnyT } from '../../definitions.interface';

/**
 * @stable [21.05.2018]
 */
export class BasePayload {
  protected type: string;
  protected payload: AnyT;

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
