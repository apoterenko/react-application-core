import { AnyT } from '../../definitions.interface';

/**
 * @stable [21.05.2018]
 */
export class CommandParam {
  private paramName: string;
  private paramValue: AnyT;

  /**
   * @stable [21.05.2018]
   * @param {string} paramName
   * @param {AnyT} paramValue
   */
  constructor(paramName: string, paramValue: AnyT) {
    this.paramName = paramName;
    this.paramValue = paramValue;
  }

  /**
   * @stable [21.05.2018]
   * @returns {string}
   */
  public getParamName(): string {
    return this.paramName;
  }

  /**
   * @stable [21.05.2018]
   * @returns {AnyT}
   */
  public getParamValue(): AnyT {
    return this.paramValue;
  }
}
