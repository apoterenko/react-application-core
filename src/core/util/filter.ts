import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
  ITypeWrapper,
} from '../definitions.interface';
import { FieldConstants } from '../definition/field-definition.interface';
import {
  KeyValuePredicateT,
  ValuePredicateT,
} from '../definition/filter-definition.interface';
import { TypeUtils } from './type';
import { IFilterAndSorterConfiguration } from '../configurations-definitions.interface';
import { ObjectUtils } from './object';

/**
 * @stable [29.08.2020]
 * @param source
 * @param predicates
 */
const cloneByFilters = <TSource, TResult>(source: TSource, ...predicates: KeyValuePredicateT[]): TResult => {
  const sourceWithObjectValues = filterByPredicate(source, ...predicates.concat(OBJECT_KEY_VALUE_PREDICATE));
  const sourceWithoutObjectValue = filterByPredicate(source, ...predicates.concat(NOT_OBJECT_KEY_VALUE_PREDICATE));

  const result = {...sourceWithoutObjectValue};
  Object
    .keys(sourceWithObjectValues)
    .forEach((key) => (result[key] = cloneByFilters(sourceWithObjectValues[key], ...predicates)));
  return result as TResult;
}

/**
 * @stable [29.08.2020]
 * @param source
 * @param predicates
 */
const filterByPredicate =
  <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource,
                                                         ...predicates: KeyValuePredicateT[]): TResult =>
    R.pickBy<TSource, TResult>(
      (value, key): boolean => predicates.length > 1
        ? (
          (predicates as (KeyValuePredicateT | boolean)[])
            .reduce(
              (prevValue, curValue): boolean =>
                (curValue as KeyValuePredicateT)(key, value) && (
                  TypeUtils.isFn(prevValue)
                    ? (prevValue as KeyValuePredicateT)(key, value)
                    : prevValue as boolean
                )
            ) as boolean
        )
        : predicates[0](key, value),
      source
    );

/**
 * @stable [15.05.2020]
 * @param {string} fields
 * @returns {(key: string, value: AnyT) => boolean}
 */
const excludeFieldsPredicateFactory = (...fields: string[]) => (key: string) => !fields.includes(key);

/**
 * @stable [15.05.2020]
 */
const EXCLUDE_ID_FIELD_PREDICATE = excludeFieldsPredicateFactory(FieldConstants.ID_FIELD_NAME);

/**
 * @stable [15.05.2020]
 */
const EXCLUDE_ENTITY_ID_FIELD_PREDICATE = excludeFieldsPredicateFactory(FieldConstants.ENTITY_ID_FIELD_NAME);

/**
 * @stable [09.01.2019]
 * @param {IEntity} entity1
 * @param {IEntity} entity2
 */
export const SAME_ENTITY_PREDICATE =
  <TEntity extends IEntityIdTWrapper = IEntityIdTWrapper>(entity1: TEntity, entity2: TEntity) =>
    entity1 === entity2 || (!R.isNil(entity1) && !R.isNil(entity2) && entity1.id === entity2.id);

/**
 * @stable [29.08.2020]
 * @param value
 * @constructor
 */
const OBJECT_VALUE_PREDICATE = (value: unknown): boolean => TypeUtils.isObject(value);

/**
 * @stable [29.08.2020]
 * @param value
 */
const EVENT_VALUE_PREDICATE = (value: unknown): boolean => TypeUtils.isEvent(value);

/**
 * @stable [29.08.2020]
 * @param key
 * @param value
 */
const OBJECT_KEY_VALUE_PREDICATE = (key: string, value: unknown): boolean => OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [29.08.2020]
 * @param value
 */
const NOT_OBJECT_VALUE_PREDICATE = (value: unknown): boolean => !OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [29.08.2020]
 * @param key
 * @param value
 */
const NOT_OBJECT_KEY_VALUE_PREDICATE = (key: string, value: unknown) => NOT_OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [28.09.2020]
 * @param value
 */
const NOT_NIL_VALUE_PREDICATE = (value: unknown) => !R.isNil(value);

/**
 * @stable [28.09.2020]
 * @param value
 */
const NIL_VALUE_PREDICATE = (value: unknown) => R.isNil(value);

/**
 * @stable [28.09.2020]
 * @param key
 * @param value
 */
const NOT_NIL_KEY_VALUE_PREDICATE = (key: string, value: unknown) => NOT_NIL_VALUE_PREDICATE(value);

/**
 * @stable [28.09.2020]
 * @param key
 * @param value
 */
const NIL_KEY_VALUE_PREDICATE = (key: string, value: unknown) => NIL_VALUE_PREDICATE(value);

/**
 * @stable [07.12.2020]
 * @param value
 * @constructor
 */
const STRING_VALUE_PREDICATE = (value: AnyT) => TypeUtils.isString(value);

/**
 * @stable [07.12.2020]
 * @param value
 */
const NOT_EMPTY_OBJECT_VALUE_PREDICATE = (value: unknown) => ObjectUtils.isObjectNotEmpty(value);

/**
 * @stable [07.12.2020]
 * @param key
 * @param value
 */
const DEF_KEY_VALUE_PREDICATE = (key: string, value: unknown) => TypeUtils.isDef(value);

/**
 * @stable [07.12.2020]
 * @param key
 * @param value
 */
const POSITIVE_OR_NEGATIVE_NUMBER_LIKE_KEY_VALUE_PREDICATE = (key: string, value: unknown) =>
  TypeUtils.isPositiveOrNegativeNumberLike(value);

/**
 * @stable [07.12.2020]
 * @param key
 * @param value
 */
const POSITIVE_NUMBER_LIKE_KEY_VALUE_PREDICATE = (key: string, value: unknown) =>
  TypeUtils.isPositiveNumberLike(value);

/**
 * @stable [07.12.2020]
 * @param key
 * @param value
 */
const NOT_EMPTY_OBJECT_KEY_VALUE_PREDICATE = (key: string, value: unknown) => NOT_EMPTY_OBJECT_VALUE_PREDICATE(value);

/**
 * @stable [16.05.2020]
 * @param {AnyT} value
 * @returns {boolean}
 */
const DEF_VALUE_PREDICATE = (value: AnyT) => TypeUtils.isDef(value);

/**
 * @stable [22.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const TRUE_VALUE_PREDICATE = (value: AnyT) => value === true;

/**
 * @stable [18.05.2020]
 * @param {TValue[]} data
 * @param {ValuePredicateT} predicates
 * @returns {TValue[]}
 */
const filterArray = <TValue>(data: TValue[], ...predicates: ValuePredicateT[]): TValue[] =>
  R.filter<TValue>(
    (value) => predicates.length > 1
      ? (predicates as (ValuePredicateT | boolean)[])
        .reduce(
          (prevValue, curValue) => (
            (curValue as ValuePredicateT)(value) && (
              TypeUtils.isFn(prevValue)
                ? (prevValue as ValuePredicateT)(value)
                : prevValue as boolean
            )
          )
        ) as boolean
      : predicates[0](value),
    data
  );

/**
 * @stable [19.05.2020]
 * @param {TValue} data
 * @returns {TValue[]}
 */
const objectValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, OBJECT_VALUE_PREDICATE);

/**
 * @stable [16.05.2020]
 * @param {TValue} data
 * @returns {TValue[]}
 */
const defValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, DEF_VALUE_PREDICATE);

/**
 * @stable [18.05.2020]
 * @param {TValue} data
 * @returns {TValue[]}
 */
const notNilValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, NOT_NIL_VALUE_PREDICATE);

/**
 * @stable [17.05.2020]
 * @param {TValue} data
 * @returns {TValue[]}
 */
const notEmptyValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, NOT_EMPTY_OBJECT_VALUE_PREDICATE);

/**
 * @stable [22.10.2019]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const trueValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, TRUE_VALUE_PREDICATE);

/**
 * @stable [25.12.2019]
 * @param {TValue} data
 * @returns {TValue[]}
 */
export const stringValuesArrayFilter = <TValue>(...data: TValue[]): TValue[] => filterArray(data, STRING_VALUE_PREDICATE);

export function excludeFieldsFilter<TSource extends IKeyValue, TResult extends IKeyValue>(
    source: TSource,
    ...fields: string[]
): TResult {
  return filterByPredicate<TSource, TResult>(source, excludeFieldsPredicateFactory(...fields));
}

/**
 * @stable [27.07.2020]
 * @param source
 */
export const defValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, DEF_KEY_VALUE_PREDICATE);

/**
 * @stable [28.07.2020]
 * @param source
 */
const positiveOrNegativeNumberLikeValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, POSITIVE_OR_NEGATIVE_NUMBER_LIKE_KEY_VALUE_PREDICATE);

/**
 * @stable [07.12.2020]
 * @param source
 */
const positiveNumberLikeValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, POSITIVE_NUMBER_LIKE_KEY_VALUE_PREDICATE);

/**
 * @stable [31.01.2019]
 * @param {TSource} source
 * @returns {TResult}
 */
export const notNilValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, NOT_NIL_KEY_VALUE_PREDICATE);

/**
 * @stable [28.09.2020]
 * @param source
 */
const nilValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, NIL_KEY_VALUE_PREDICATE);

/**
 * @stable [07.12.2020]
 * @param source
 */
const notEmptyValuesFilter = <TSource extends IKeyValue, TResult extends IKeyValue>(source: TSource): TResult =>
  filterByPredicate<TSource, TResult>(source, NOT_EMPTY_OBJECT_KEY_VALUE_PREDICATE);

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
 * @stable [06.04.2020]
 * @param {TValue[]} data
 * @param {TType} type
 * @returns {TValue}
 */
export const findByType = <TValue extends ITypeWrapper<TType>, TType>(data: TValue[], type: TType): TValue =>
  data.find((itm) => itm.type === type);

/**
 * @stable [09.08.2020]
 * @param query
 * @param items
 */
const queryFilter = (query: string, ...items: EntityIdT[]): boolean => {
  if (!ObjectUtils.isObjectNotEmpty(query)) {
    return true;
  }
  let result = false;
  items
    .map(
      (item) => (
        TypeUtils.isString(item)
          ? item as string
          : R.isNil(item) ? '' : String(item)
      ).toUpperCase()
    )
    .forEach((v) => result = result || v.includes(query.toUpperCase()));
  return result;
};

/**
 * @stable [15.05.2020]
 */
export class FilterUtils {
  public static readonly cloneByFilters = cloneByFilters;
  public static readonly defValuesArrayFilter = defValuesArrayFilter;
  public static readonly defValuesFilter = defValuesFilter;
  public static readonly EVENT_VALUE_PREDICATE = EVENT_VALUE_PREDICATE;
  public static readonly EXCLUDE_ENTITY_ID_FIELD_PREDICATE = EXCLUDE_ENTITY_ID_FIELD_PREDICATE;
  public static readonly excludeFieldsPredicateFactory = excludeFieldsPredicateFactory;
  public static readonly filterByPredicate = filterByPredicate;
  public static readonly nilValuesFilter = nilValuesFilter;
  public static readonly NOT_NIL_VALUE_PREDICATE = NOT_NIL_VALUE_PREDICATE;
  public static readonly notEmptyValuesArrayFilter = notEmptyValuesArrayFilter;
  public static readonly notEmptyValuesFilter = notEmptyValuesFilter;
  public static readonly notNilValuesArrayFilter = notNilValuesArrayFilter;
  public static readonly notNilValuesFilter = notNilValuesFilter;
  public static readonly OBJECT_VALUE_PREDICATE = OBJECT_VALUE_PREDICATE;
  public static readonly objectValuesArrayFilter = objectValuesArrayFilter;
  public static readonly positiveNumberLikeValuesFilter = positiveNumberLikeValuesFilter;
  public static readonly positiveOrNegativeNumberLikeValuesFilter = positiveOrNegativeNumberLikeValuesFilter;
  public static readonly queryFilter = queryFilter;
  public static readonly SAME_ENTITY_PREDICATE = SAME_ENTITY_PREDICATE;
  public static readonly STRING_VALUE_PREDICATE = STRING_VALUE_PREDICATE;
}
