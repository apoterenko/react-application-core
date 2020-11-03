import * as R from 'ramda';

import {
  AnyT,
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
} from '../definitions.interface';
import { EntityUtils } from './entity';
import { FilterUtils } from './filter';
import { ifNotNilThanValue } from './cond';
import { nvl } from './nvl';
import { TypeUtils } from './type';

/**
 * @stable [16.12.2018]
 * @param {number} length
 * @returns {AnyT[]}
 */
export const makeArray = (length: number): AnyT[] => Array.apply(null, {length});

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
 * @stable [19.12.2018]
 * @param {TValue[]} array
 * @returns {boolean}
 */
export const isArrayNotEmpty = <TValue>(array: TValue[]): boolean => Array.isArray(array) && !R.isEmpty(array);

/**
 * @stable [28.01.2019]
 * @param {TValue[]} array
 * @param {number} limit
 * @returns {TValue[]}
 */
export const subArray = <TValue>(array: TValue[], limit?: number): TValue[] =>
  ifNotNilThanValue(array, () => array.slice(0, Math.min(array.length, nvl(limit, array.length))));

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
 * @stable [31.07.2020]
 */
export class ArrayUtils {
  public static readonly doesArrayContainExistedEntity = doesArrayContainExistedEntity;
  public static readonly mergeArrayItem = mergeArrayItem;
}
