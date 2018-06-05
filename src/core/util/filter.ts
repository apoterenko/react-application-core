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
} from '../definitions.interface';
import { isDef, isObject, isFn } from './type';
import { INamedEntity } from '../entities-definitions.interface';
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
 * @stable [05.06.2018]
 * @param {IEntity[] | IEntity} data
 * @param {IFilterAndSorterConfiguration} config
 * @returns {IEntity[]}
 */
export const filterAndSortEntities = (data: IEntity[] | IEntity,
                                      config?: IFilterAndSorterConfiguration): IEntity[] => {
  if (R.isNil(data)) {
    return data;
  }
  let entities: INamedEntity[] = [].concat(data);
  if (!R.isNil(config)) {
    if (!R.isNil(config.filter)) {
      entities = R.filter<INamedEntity>(config.filter, entities);
    }
    if (!R.isNil(config.sorter)) {
      entities = R.sort<INamedEntity>(config.sorter, entities);
    }
  }
  return entities;
};
