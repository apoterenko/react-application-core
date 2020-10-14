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
 * @stable [29.08.2018]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 */
export const ID_ASC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_ASC_SORTER(item1.id, item2.id);

/**
 * @stable [13.05.2019]
 * @param {TEntity} item1
 * @param {TEntity} item2
 * @returns {number}
 */
export const ID_DESC_ENTITIES_SORTER_FN = <TEntity extends IEntity>(item1: TEntity, item2: TEntity): number =>
  VALUE_DESC_SORTER(item1.id, item2.id);

/**
 * @stable [16.06.2020]
 */
export class SortUtils {
  public static readonly NAME_ASC_SORTER = NAME_ASC_SORTER;
  public static readonly NUMBER_COMPARATOR = NUMBER_COMPARATOR;
  public static readonly VALUE_ASC_SORTER = VALUE_ASC_SORTER;
  public static readonly VALUE_DESC_SORTER = VALUE_DESC_SORTER;
}
