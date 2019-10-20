import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  FROM_TIME_FIELD_NAME,
  ID_FIELD_NAME,
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
  TIME_FIELD_NAME,
  TO_TIME_FIELD_NAME,
} from '../definitions.interface';
import { isDef, isObject, isFn, isString } from './type';
import { IFilterAndSorterConfiguration } from '../configurations-definitions.interface';
import { isObjectNotEmpty } from './object';

export type KeyPredicateT = (key: string, value: AnyT) => boolean;
export type ValuePredicateT = (value: AnyT) => boolean;

export function cloneUsingFilters<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource, ...predicates: KeyPredicateT[]
): TResult {
  const sourceWithObjectValues = filterByPredicate<TSource, TResult>(source, ...predicates.concat(OBJECT_KEY_VALUE_PREDICATE));
  const result: TResult = {...filterByPredicate<TSource, TResult>(source, ...predicates.concat(NOT_OBJECT_KEY_VALUE_PREDICATE)) as {}} as TResult;
  Object.keys(sourceWithObjectValues).forEach((key) => {
    result[key] = cloneUsingFilters<TSource, TResult>(sourceWithObjectValues[key], ...predicates);
  });
  return result;
}

/**
 * @stable [11.08.2018]
 * @param {TSource} source
 * @param {KeyPredicateT} predicates
 * @returns {TResult}
 */
export const filterByPredicate = <TSource extends IKeyValue, TResult extends IKeyValue>(
  source: TSource,
  ...predicates: KeyPredicateT[]
): TResult =>
  Object.freeze(
    R.pickBy<TSource, TResult>(
      (value, key): boolean => predicates.length > 1
        ? (predicates as Array<KeyPredicateT | boolean>)
          .reduce(
            (previousValue, currentValue): boolean =>
              (currentValue as KeyPredicateT)(key, value)
              && (isFn(previousValue)
              ? (previousValue as KeyPredicateT)(key, value)
              : previousValue as boolean)
          ) as boolean
        : predicates[0](key, value),
      source
    )
  );

export function excludeFieldsPredicateFactory(...fields: string[]) {
  return (key: string, value: AnyT) => !fields.includes(key);
}

export const EXCLUDE_ID_FIELD_PREDICATE = excludeFieldsPredicateFactory(ID_FIELD_NAME);
export const EXCLUDE_TIME_FIELDS_PREDICATE = excludeFieldsPredicateFactory(
  TIME_FIELD_NAME,
  FROM_TIME_FIELD_NAME,
  TO_TIME_FIELD_NAME,
);

/**
 * @test
 * @param {TSource} source
 * @returns {TResult}
 */
export function cloneUsingTimeFieldsFilters<TSource extends IKeyValue, TResult extends IKeyValue>(
  source: TSource): TResult {
  return cloneUsingFilters<TSource, TResult>(source, EXCLUDE_TIME_FIELDS_PREDICATE);
}

/**
 * @stable [09.01.2019]
 * @param {IEntity} entity1
 * @param {IEntity} entity2
 */
export const SAME_ENTITY_PREDICATE =
  <TEntity extends IEntityIdTWrapper = IEntityIdTWrapper>(entity1: TEntity, entity2: TEntity) =>
    entity1 === entity2 || entity1.id === entity2.id;

/**
 * @stable [03.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const OBJECT_VALUE_PREDICATE = (value: AnyT): boolean => isObject(value);

/**
 * @stable [03.10.2019]
 * @param {string} key
 * @param {AnyT} value
 * @returns {boolean}
 */
export const OBJECT_KEY_VALUE_PREDICATE = (key: string, value: AnyT): boolean => OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [03.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_OBJECT_VALUE_PREDICATE = (value: AnyT): boolean => !OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [03.10.2019]
 * @param {string} key
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_OBJECT_KEY_VALUE_PREDICATE = (key: string, value: AnyT) => NOT_OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [27.10.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_NIL_VALUE_PREDICATE = (value: AnyT) => !R.isNil(value);

/**
 * @stable [03.10.2019]
 * @param {string} key
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_NIL_KEY_VALUE_PREDICATE = (key: string, value: AnyT) => NOT_NIL_VALUE_PREDICATE(value);

/**
 * @stable [23.09.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const STRING_VALUE_PREDICATE = (value: AnyT) => isString(value);

/**
 * @stable [31.03.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_EMPTY_VALUE_PREDICATE = (value: AnyT) => isObjectNotEmpty(value);

/**
 * @stable [03.10.2018]
 * @param {string} key
 * @param {AnyT} value
 * @returns {boolean}
 */
export const DEF_KEY_VALUE_PREDICATE = (key: string, value: AnyT) => isDef(value);

/**
 * @stable [31.03.2019]
 * @param {string} key
 * @param {AnyT} value
 * @returns {boolean}
 */
export const NOT_EMPTY_KEY_VALUE_PREDICATE = (key: string, value: AnyT) => NOT_EMPTY_VALUE_PREDICATE(value);

/**
 * @stable [03.10.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const DEF_VALUE_PREDICATE = (value: AnyT) => isDef(value);

/**
 * @stable [19.12.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const TRUE_VALUE_PREDICATE = (value: AnyT) => !!value;

/**
 * @stable [03.10.2018]
 * @param {TValue[]} data
 * @param {ValuePredicateT} predicates
 * @returns {TValue[]}
 */
export const filterArray = <TValue>(data: TValue[], ...predicates: ValuePredicateT[]): TValue[] =>
  R.filter<TValue>((value) => predicates.length > 1
    ? (predicates as Array<ValuePredicateT | boolean>)
      .reduce(
        (previousValue, currentValue) => (currentValue as ValuePredicateT)(value)
          && (isFn(previousValue) ? (previousValue as ValuePredicateT)(value) : previousValue as boolean)
      ) as boolean
    : predicates[0](value), data);

/**
 * @stable [10.11.2018]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const defValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, DEF_VALUE_PREDICATE);

/**
 * @stable [03.10.2019]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const objectValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, OBJECT_VALUE_PREDICATE);

/**
 * @stable [29.11.2018]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const notNilValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, NOT_NIL_VALUE_PREDICATE);

/**
 * @stable [19.12.2018]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const trueValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, TRUE_VALUE_PREDICATE);

export function excludeFieldsFilter<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource,
    ...fields: string[]
): TResult {
  return filterByPredicate<TSource, TResult>(source, excludeFieldsPredicateFactory(...fields));
}

export const defValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, DEF_KEY_VALUE_PREDICATE);

/**
 * @stable [31.01.2019]
 * @param {TSource} source
 * @returns {TResult}
 */
export const notNilValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, NOT_NIL_KEY_VALUE_PREDICATE);

/**
 * @stable [31.03.2019]
 * @param {TSource} source
 * @returns {TResult}
 */
export const notEmptyValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, NOT_EMPTY_KEY_VALUE_PREDICATE);

export const excludeIdFieldFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, EXCLUDE_ID_FIELD_PREDICATE);

/**
 * @stable [16.06.2018]
 * @param {TEntity[] | TEntity} data
 * @param {IFilterAndSorterConfiguration} config
 * @returns {TEntity[]}
 */
export const filterAndSortEntities = <TEntity = IEntity>(data: TEntity[] | TEntity,
                                                         config?: IFilterAndSorterConfiguration): TEntity[] => {
  if (R.isNil(data)) {
    return data;
  }
  let entities: TEntity[] = [].concat(data);
  if (!R.isNil(config)) {
    if (!R.isNil(config.filter)) {
      entities = R.filter<TEntity>(config.filter, entities);
    }
    if (!R.isNil(config.sorter)) {
      entities = R.sort<TEntity>(config.sorter, entities);
    }
  }
  return entities;
};

/**
 * @stable [08.06.2018]
 * @param {string} query
 * @param {EntityIdT} items
 * @returns {boolean}
 */
export const queryFilter = (query: string, ...items: EntityIdT[]): boolean => {
  if (R.isNil(query) || R.isEmpty(query)) {
    return true;
  }
  let result = false;
  items.map((v) => (isString(v) ? v as string : R.isNil(v) ? '' : String(v)).toUpperCase())
    .forEach((v) => result = result || v.includes(query.toUpperCase()));
  return result;
};
