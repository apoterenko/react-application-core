import * as R from 'ramda';

import { AnyT, ID_FIELD_NAME, IKeyValue } from '../definition.interface';
import { isUndef } from './type';

type PredicateT = (key: string, value: AnyT) => boolean;

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
    source: TSource, predicate: PredicateT
): TResult {
  return R.pickBy<TSource, TResult>((value, key) => predicate(key, value), source);
}

export function noUndefValuesFilter<TSource extends IKeyValue,
                                    TResult extends IKeyValue>(source: TSource): TResult {
  return filterByPredicate(source, (key, value) => !isUndef(value));
}

export function excludeIdFieldFilter<TSource extends IKeyValue,
    TResult extends IKeyValue>(source: TSource): TResult {
  return filterByPredicate(source, (key, value) => key !== ID_FIELD_NAME);
}
