/**
 * @stable [16.05.2020]
 */
export enum RegexpEnum {
  NUMBER = '[-+]?[0-9]*[.,]?[0-9]+',
  POSITIVE_INTEGER = '^\\d+$',                                   // @stable [29.07.2020] @see https://projects.lukehaas.me/regexhub/
  POSITIVE_NUMBER = '^\\d*\\.?\\d+$',                            // @stable [28.07.2020] @see https://projects.lukehaas.me/regexhub/
  POSITIVE_OR_NEGATIVE_INTEGER = '^-?\\d+$',                     // @stable [07.09.2020]
  POSITIVE_OR_NEGATIVE_NUMBER = '^-?\\d*\\.?\\d+$',              // @stable [28.07.2020] @see https://projects.lukehaas.me/regexhub/
  POSITIVE_OR_NEGATIVE_PRICE = '^[-+]?\\d+(\\.\\d{1,4})?$',      // @stable [28.07.2020]
  PRICE = '^\\d+(\\.\\d{1,4})?$',                                // @stable [28.07.2020]
  SPECIAL_CHARACTER = '[^A-Za-z0-9]',                            // @stable [22.01.2021] @see https://github.com/nowsecure/owasp-password-strength-test/blob/master/owasp-password-strength-test.js
}

/**
 * @stable [16.05.2020]
 */
export class RegexpConstants {
  public static readonly NUMBER = new RegExp(RegexpEnum.NUMBER);
  public static readonly POSITIVE_INTEGER = new RegExp(RegexpEnum.POSITIVE_INTEGER);
  public static readonly POSITIVE_NEGATIVE_PRICE = new RegExp(RegexpEnum.POSITIVE_OR_NEGATIVE_PRICE);
  public static readonly POSITIVE_NUMBER = new RegExp(RegexpEnum.POSITIVE_NUMBER);
  public static readonly POSITIVE_OR_NEGATIVE_INTEGER = new RegExp(RegexpEnum.POSITIVE_OR_NEGATIVE_INTEGER);
  public static readonly POSITIVE_OR_NEGATIVE_NUMBER = new RegExp(RegexpEnum.POSITIVE_OR_NEGATIVE_NUMBER);
  public static readonly PRICE = new RegExp(RegexpEnum.PRICE);
  public static readonly SPECIAL_CHARACTER = new RegExp(RegexpEnum.SPECIAL_CHARACTER);
}
