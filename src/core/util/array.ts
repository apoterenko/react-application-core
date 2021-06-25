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
 * @stable [20.01.2021]
 * @param length
 */
const makeArray = <TValue = unknown>(length: number): TValue[] => Array.apply(null, {length});

/**
 * @stable [20.01.2021]
 * @param array
 */
const minValue = (array: number[]): number => R.reduce(R.min, Infinity, array) as number;

/**
 * @stable [21.01.2021]
 * @param array
 */
const nextMinNegativeValue = (array: number[]): number => Math.min(Number(minValue(array)), 0) - 1;

/**
 * TODO
 * @deprecated
 */
export const isArrayNotEmpty = <TValue>(array: TValue[]): boolean => Array.isArray(array) && !R.isEmpty(array);

/**
 * @stable [21.01.2021]
 * @param array
 * @param limit
 * @param start
 */
const subArray = <TValue>(array: TValue[], limit?: number, start = 0): TValue[] =>
  ConditionUtils.ifNotNilThanValue(
    array,
    () => array.slice(start, start + Math.min(array.length, NvlUtils.nvl(limit, array.length)))
  );

/**
 * @stable [21.01.2021]
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
 * @stable [21.01.2021]
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
 * @stable [21.01.2021]
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
 * @stable [21.01.2021]
 * @param data
 */
const withoutDuplicates = <TEntity = IEntity>(...data: TEntity[]): TEntity[] =>
  Array.from(new Set(data));

/**
 * @stable [24.06.2021]
 * @param ids
 * @param actualIds
 */
const arraysDiffs = <TValue = unknown>(ids: TValue[],
                                       actualIds: TValue[]): { removed: TValue[], added: TValue[], actual: TValue[] } => {
  const added = R.difference(ids, actualIds);
  const removed = R.difference(actualIds, ids);
  return {
    removed,
    added,
    actual: [
      ...added,
      ...ids
        .filter((id) => ![...added, ...removed].includes(id))
    ],
  };
};

/**
 * @stable [21.01.2021]
 */
export class ArrayUtils {
  public static readonly arraysDiffs = arraysDiffs;
  public static readonly doesArrayContainExistedEntity = doesArrayContainExistedEntity;
  public static readonly makeArray = makeArray;
  public static readonly mergeArrayItem = mergeArrayItem;
  public static readonly nextMinNegativeValue = nextMinNegativeValue;
  public static readonly subArray = subArray;
  public static readonly withoutDuplicates = withoutDuplicates;
}
