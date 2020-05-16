/**
 * @stable [16.05.2020]
 */
export enum RegexpEnum {
  DIGITAL = '[0-9]+',
  NUMBER = '[-+]?[0-9]*[.,]?[0-9]+',
  POSITIVE_NEGATIVE_PRICE = '[-+]?\\d+(\\.\\d{1,2})?',
  PRICE = '\\d+(\\.\\d{1,2})?',
}

/**
 * @stable [16.05.2020]
 */
export class RegexpConstants {
  public static readonly DIGITAL = new RegExp(RegexpEnum.DIGITAL);
  public static readonly NUMBER = new RegExp(RegexpEnum.NUMBER);
  public static readonly POSITIVE_NEGATIVE_PRICE = new RegExp(RegexpEnum.POSITIVE_NEGATIVE_PRICE);
  public static readonly PRICE = new RegExp(RegexpEnum.PRICE);
}
