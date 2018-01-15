import * as R from 'ramda';

import { AnyT, ID_FIELD_NAME, IKeyValue } from '../definition.interface';
import { isUndef, isFn } from './type';

export type PredicateT = (key: string, value: AnyT) => boolean;

export function filterBy<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource, predicate: PredicateT
): TResult {
  return R.pickBy<TSource, TResult>((value, key) => {
    if (typeof value === 'object' && !R.isNil(value) && !Array.isArray(value)) {
      source[key] = filterBy(value, predicate);
    }
    return predicate(key, value);
  }, source);
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

export function excludeIdFieldPredicateFactory() {
  return excludeFieldsPredicateFactory(ID_FIELD_NAME);
}

export function noUndefValuesPredicateFactory() {
  return (key: string, value: AnyT) => !isUndef(value);
}

export function excludeFieldsFilter<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource,
    ...fields: string[]
): TResult {
  return filterByPredicate(source, excludeFieldsPredicateFactory(...fields));
}

export function noUndefValuesFilter<TSource extends IKeyValue,
                                    TResult extends IKeyValue>(source: TSource): TResult {
  return filterByPredicate(source, noUndefValuesPredicateFactory());
}

export function excludeIdFieldFilter<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource
): TResult {
  return filterByPredicate(source, excludeIdFieldPredicateFactory());
}
