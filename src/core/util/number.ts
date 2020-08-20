import { DefaultEntities } from '../definition/default-definition.interface';

/**
 * @stable [24.07.2020]
 * @param num
 * @param precision
 */
const roundByPrecision = (num: number, precision = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
  Number(`${Math.round(Number(`${num}e${precision}`))}e-${precision}`);

/**
 * @stable [20.08.2020]
 * @param num
 * @param divider
 */
const roundDownByDivider = (num: number, divider: number): number =>
  Math.floor(num - num % divider);

/**
 * @stable [24.07.2020]
 * @param num
 */
const invert = (num: number): number => num === 0 ? num : num * -1; // To exclude the "-0" case

/**
 * @stable [20.08.2020]
 * @param value
 * @param total
 */
const percent = (value: number, total: number): number => total === 0 ? 0 : (value * 100) / total;

/**
 * @stable [20.08.2020]
 * @param value
 * @param total
 */
const roundedPercent = (value: number, total: number): number => Math.round(percent(value, total));

/**
 * @stable [20.08.2020]
 * @param value
 * @param total
 */
const proportion = (value: number, total: number) => (value * total) / 100;

/**
 * @stable [20.08.2020]
 * @param divider
 * @param num
 */
const residueRoundDownByDivider = (num: number, divider = DefaultEntities.UNIT_OF_CURRENCY): number => num - roundDownByDivider(num, divider);

/**
 * @stable [20.08.2020]
 * @param value
 * @param total
 * @param offValue
 */
const roundedProportion = (value: number, total: number, offValue = DefaultEntities.UNIT_OF_CURRENCY): number => {
  const result = proportion(value, total);
  return result + residueRoundDownByDivider(total - result, offValue);
};

/**
 * @stable [20.08.2020]
 * @param value
 * @param total
 * @param offValue
 * @param precisionValue
 */
const roundedByPrecisionProportion = (value: number,
                                      total: number,
                                      offValue = DefaultEntities.UNIT_OF_CURRENCY,
                                      precisionValue = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
  roundByPrecision(roundedProportion(value, total, offValue), precisionValue);

/**
 * @stable [17.08.2020]
 * @param value
 */
const isOddNumber = (value: number): boolean => value % 2 !== 0;

/**
 * @stable [29.06.2020]
 */
export class NumberUtils {
  public static readonly invert = invert;
  public static readonly isOddNumber = isOddNumber;
  public static readonly percent = percent;
  public static readonly proportion = proportion;
  public static readonly residueRoundDownByDivider = residueRoundDownByDivider;
  public static readonly roundByPrecision = roundByPrecision;
  public static readonly roundDownByDivider = roundDownByDivider;
  public static readonly roundedByPrecisionProportion = roundedByPrecisionProportion;
  public static readonly roundedPercent = roundedPercent;
  public static readonly roundedProportion = roundedProportion;
}
