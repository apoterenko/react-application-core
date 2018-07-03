import * as R from 'ramda';

import {
  AnyT,
  ID_FIELD_NAME,
  IKeyValue,
  PROGRESS_FIELD_NAME,
  PASSWORD_FIELD_NAME,
  FROM_TIME_FIELD_NAME,
  TO_TIME_FIELD_NAME,
  TIME_FIELD_NAME,
  EFFECTOR_FIELD_NAME,
  IEntity,
  EntityIdT,
} from '../definitions.interface';
import { isDef, isObject, isFn, isString } from './type';
import { IFilterAndSorterConfiguration } from '../configurations-definitions.interface';

export type PredicateT = (key: string, value: AnyT) => boolean;

export function cloneUsingFilters<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource, ...predicates: PredicateT[]
): TResult {
  const sourceWithObjectValues = filterByPredicate<TSource, TResult>(source, ...predicates.concat(OBJECT_VALUE_PREDICATE));
  const result = filterByPredicate<TSource, TResult>(source, ...predicates.concat(NOT_OBJECT_VALUE_PREDICATE));
  Object.keys(sourceWithObjectValues).forEach((key) => {
    result[key] = cloneUsingFilters<TSource, TResult>(sourceWithObjectValues[key], ...predicates);
  });
  return result;
}

export function filterByPredicate<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource,
    ...predicates: PredicateT[]
): TResult {
  return R.pickBy<TSource, TResult>(
      (value, key): boolean => predicates.length > 1
          ? (predicates as Array<PredicateT | boolean>)
              .reduce(
                  (previousValue, currentValue): boolean =>
                      (currentValue as PredicateT)(key, value)
                      && (isFn(previousValue)
                            ? (previousValue as PredicateT)(key, value)
                            : previousValue as boolean)
              ) as boolean
          : predicates[0](key, value),
      source
  );
}

export function excludeFieldsPredicateFactory(...fields: string[]) {
  return (key: string, value: AnyT) => !fields.includes(key);
}

export const EXCLUDE_ID_FIELD_PREDICATE = excludeFieldsPredicateFactory(ID_FIELD_NAME);
export const EXCLUDE_EFFECTOR_FIELD_PREDICATE = excludeFieldsPredicateFactory(EFFECTOR_FIELD_NAME);
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

export const OBJECT_VALUE_PREDICATE = (key: string, value: AnyT) => isObject(value);
export const NOT_OBJECT_VALUE_PREDICATE = (key: string, value: AnyT) => !isObject(value);
export const NOT_PROGRESS_FIELD_PREDICATE = (key: string, value: AnyT) => key !== PROGRESS_FIELD_NAME;
export const NOT_PASSWORD_FIELD_PREDICATE = (key: string, value: AnyT) => key !== PASSWORD_FIELD_NAME;

export const DEF_VALUE_PREDICATE = (key: string, value: AnyT) => isDef(value);

export function excludeFieldsFilter<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource,
    ...fields: string[]
): TResult {
  return filterByPredicate<TSource, TResult>(source, excludeFieldsPredicateFactory(...fields));
}

export const defValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, DEF_VALUE_PREDICATE);

export const excludeIdFieldFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, EXCLUDE_ID_FIELD_PREDICATE);

export const excludeEffectorFieldFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, EXCLUDE_EFFECTOR_FIELD_PREDICATE);

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
