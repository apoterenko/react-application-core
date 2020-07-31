import * as R from 'ramda';

import {
  AnyT,
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { isFn } from './type';
import {
  FilterUtils,
  SAME_ENTITY_PREDICATE,
} from './filter';
import { nvl } from './nvl';
import { EntityUtils } from './entity';

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
 * @stable [04.10.2019]
 * @param {TValue[]} array
 * @param {TValue} initialItem
 * @param {(entity1: IEntity, entity2: IEntity) => boolean} predicate
 * @param {(previousItem: TValue) => TValue} itemFactory
 * @returns {TValue[]}
 */
export const mergeArrayItem = <TValue extends IKeyValue>(array: TValue[],
                                                         initialItem: TValue,
                                                         predicate = SAME_ENTITY_PREDICATE,
                                                         itemFactory?: (previousItem: TValue) => TValue): TValue[] => {
  const array0 = array || [];
  const hasEntity = doesArrayContainExistedEntity(array0, initialItem, predicate);
  const isMergedItemFactoryFn = isFn(itemFactory);
  const result = hasEntity
    ? array0
    : [...array0, isMergedItemFactoryFn ? itemFactory(initialItem) : initialItem];
  if (!hasEntity) {
    return result;
  }
  return result.map(
    (itm) => predicate(itm, initialItem)
      ? (
        isMergedItemFactoryFn
          ? itemFactory(itm)      // Custom creating
          : initialItem           // Replace
      )
      : itm
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
                                      predicate = SAME_ENTITY_PREDICATE): boolean =>
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
                                      predicate = SAME_ENTITY_PREDICATE): boolean =>
    !EntityUtils.isNewEntity(entity) && doesArrayContainEntity(data, entity, predicate);

/**
 * @stable [31.08.2019]
 * @param {AnyT} values
 * @returns {boolean}
 */
export const areArrayValuesNotNil = (...values: AnyT[]): boolean =>
  ifNotNilThanValue(
    values,
    () => FilterUtils.notNilValuesArrayFilter(...values).length === values.length,
    false
  );

/**
 * @stable [31.07.2020]
 */
export class ArrayUtils {
  public static readonly doesArrayContainEntity = doesArrayContainEntity;
  public static readonly doesArrayContainExistedEntity = doesArrayContainExistedEntity;
}
