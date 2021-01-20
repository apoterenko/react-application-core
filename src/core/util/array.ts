import * as R from 'ramda';

import {
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { EntityUtils } from './entity';
import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { TypeUtils } from './type';

/**
 * @stable [27.12.2020]
 * @param length
 */
const makeArray = <TValue = unknown>(length: number): TValue[] => Array.apply(null, {length});

/**
 * @stable [19.11.2018]
 * @param {number[]} array
 * @returns {number}
 */
export const arrayMinValue = (array: number[]): number => R.reduce(R.min, Infinity, array) as number;

/**
 * @stable [22.11.2018]
 * @param {number[]} array
 * @returns {number}
 */
export const arrayNextMinNegativeValue = (array: number[]): number => Math.min(Number(arrayMinValue(array)), 0) - 1;

/**
 * @stable [13.12.2020]
 * @param array
 */
export const isArrayNotEmpty = <TValue>(array: TValue[]): boolean => Array.isArray(array) && !R.isEmpty(array);

/**
 * @stable [27.12.2020]
 * @param array
 * @param limit
 */
const subArray = <TValue>(array: TValue[], limit?: number): TValue[] =>
  ConditionUtils.ifNotNilThanValue(
    array,
    () => array.slice(0, Math.min(array.length, NvlUtils.nvl(limit, array.length)))
  );

/**
 * @stable [06.09.2020]
 * @param array
 * @param item
 * @param predicate
 * @param itemFactory
 */
const mergeArrayItem = <TValue = IKeyValue>(array: TValue[],
                                            item: TValue,
                                            predicate = FilterUtils.SAME_ENTITY_PREDICATE,
                                            itemFactory?: ($item: TValue) => TValue): TValue[] => {
  const $array = array || [];
  const hasEntity = doesArrayContainExistedEntity($array, item, predicate);
  const hasItemFactory = TypeUtils.isFn(itemFactory);
  const result = hasEntity
    ? $array
    : [hasItemFactory ? itemFactory(item) : item, ...$array];

  if (!hasEntity) {
    return result;
  }
  return result.map(
    ($item) => predicate($item, item)
      ? (
        hasItemFactory
          ? itemFactory($item)      // Custom creating
          : item                    // Replace
      )
      : $item
  );
};

/**
 * @stable [31.07.2020]
 * @param data
 * @param entity
 * @param predicate
 */
const doesArrayContainEntity =
  <TEntity extends IEntity = IEntity>(data: TEntity[],
                                      entity: IEntityIdTWrapper,
                                      predicate = FilterUtils.SAME_ENTITY_PREDICATE): boolean =>
    R.any((item) => predicate(item, entity), data || []);

/**
 * @stable [31.07.2020]
 * @param data
 * @param entity
 * @param predicate
 */
const doesArrayContainExistedEntity =
  <TEntity extends IEntity = IEntity>(data: TEntity[],
                                      entity: IEntityIdTWrapper,
                                      predicate = FilterUtils.SAME_ENTITY_PREDICATE): boolean =>
    !EntityUtils.isNewEntity(entity) && doesArrayContainEntity(data, entity, predicate);

/**
 * @stable [20.01.2021]
 * @param data
 */
const withoutDuplicates = <TEntity = IEntity>(...data: TEntity[]): TEntity[] =>
  Array.from(new Set(data));

/**
 * @stable [31.07.2020]
 */
export class ArrayUtils {
  public static readonly doesArrayContainExistedEntity = doesArrayContainExistedEntity;
  public static readonly isArrayNotEmpty = isArrayNotEmpty;
  public static readonly makeArray = makeArray;
  public static readonly mergeArrayItem = mergeArrayItem;
  public static readonly subArray = subArray;
  public static readonly withoutDuplicates = withoutDuplicates;
}
