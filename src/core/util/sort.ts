import {
  IEntity,
  StringNumberT,
  AnyT,
} from '../definitions.interface';
import { NvlUtils } from '../util';

/**
 * @stable [14.10.2020]
 * @param a
 * @param b
 */
const NUMBER_COMPARATOR = (a: AnyT, b: AnyT): number => a - b;

/**
 * @stable [14.10.2020]
 * @param value1
 * @param value2
 */
const NAME_ASC_SORTER = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  NvlUtils.nvl(`${value1}`, '').localeCompare(`${value2}`);

/**
 * @stable [06.09.2020]
 * @param value1
 * @param value2
 */
const VALUE_DESC_SORTER = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  VALUE_ASC_SORTER(value1, value2) * -1;

/**
 * @stable [14.10.2020]
 * @param value1
 * @param value2
 */
const VALUE_ASC_SORTER = <TEntity extends IEntity>(value1: StringNumberT, value2: StringNumberT): number =>
  value1 === value2 ? 0 : NUMBER_COMPARATOR(value1, value2);

/**
 * @stable [14.10.2020]
 * @param item1
 * @param item2
 */
const ID_ASC_SORTER = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_ASC_SORTER(item1.id, item2.id);

/**
 * @stable [14.10.2020]
 * @param item1
 * @param item2
 */
const ID_DESC_SORTER = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_DESC_SORTER(item1.id, item2.id);

/**
 * @stable [14.01.2020]
 * @param value1
 * @param value2
 *
 * Ordinary week:
 *   0 - Sunday
 *   1 - Monday
 *   ...
 *   6 - Saturday
 *
 * Iso week: (https://en.wikipedia.org/wiki/ISO_week_date: Weeks start with Monday)
 *   1 - Monday
 *   ...
 *   6 - Saturday
 *   0 - Sunday
 */
const ISO_WEEK_DAYS_SORTER = (value1: number, value2: number): number => {
  if (value2 === 0 && value1 > 0) {
    return -1;
  }
  return SortUtils.VALUE_ASC_SORTER(value1, value2);
};

/**
 * @stable [14.10.2020]
 */
export class SortUtils {
  public static readonly ID_ASC_SORTER = ID_ASC_SORTER;
  public static readonly ID_DESC_SORTER = ID_DESC_SORTER;
  public static readonly ISO_WEEK_DAYS_SORTER = ISO_WEEK_DAYS_SORTER;
  public static readonly NAME_ASC_SORTER = NAME_ASC_SORTER;
  public static readonly NUMBER_COMPARATOR = NUMBER_COMPARATOR;
  public static readonly VALUE_ASC_SORTER = VALUE_ASC_SORTER;
  public static readonly VALUE_DESC_SORTER = VALUE_DESC_SORTER;
}
