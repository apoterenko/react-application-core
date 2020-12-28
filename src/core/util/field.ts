import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
  IKeyValue,
} from '../definitions.interface';
import {
  FieldConstants,
  IGenericFieldEntity,
  IMultiItemEntity,
  IReduxMultiEntity,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  NotMultiFieldValueT,
} from '../definition';
import { ConditionUtils } from './cond';
import {
  arrayNextMinNegativeValue,
  ArrayUtils,
} from './array';
import { TypeUtils } from './type';
import { defValuesFilter } from './filter';
import { MultiFieldUtils } from './multi-field';

/**
 * @stable [14.10.2020]
 * @param config
 */
const asActualFieldValue = (config: IGenericFieldEntity): unknown => {
  const {
    emptyValue,
    keepChanges,
    originalValue,
    value,
  } = config;

  const isOriginalValueDefined = TypeUtils.isDef(originalValue);
  const originalOrEmptyValue = isOriginalValueDefined ? originalValue : emptyValue;

  return TypeUtils.isDef(originalOrEmptyValue) && R.equals(value, originalOrEmptyValue)
    ? (
      isOriginalValueDefined
        ? FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES
        : (keepChanges ? value : FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES)
    )
    : value;
};

/**
 * @stable [27.08.2019]
 * @param {EntityIdT} key
 * @returns {string}
 */
export const dynamicFieldName = (key: EntityIdT): string => `$$dynamicField-${key}`;

/**
 * @stable [29.06.2020]
 * @param object
 * @param key
 */
const dynamicFieldValue = <TEntity = IEntity>(object: TEntity, key: EntityIdT): AnyT => object[dynamicFieldName(key)];

/**
 * @stable [27.10.2020]
 * @param array
 * @param keyAccessor
 * @param valueAccessor
 */
const asDynamicObject = <TEntity extends IEntity | EntityIdT, TResult = IKeyValue>(
  array: TEntity[],
  keyAccessor: (itm: TEntity) => EntityIdT,
  valueAccessor: (itm: TEntity) => EntityIdT
): TResult =>
  R.mergeAll(array.map((itm) => ({
      [dynamicFieldName(keyAccessor(itm))]: valueAccessor(itm),
    }))
  );

/**
 * @stable [28.10.2020]
 * @param array
 * @param valueAccessor
 */
const asDynamicObjectFromIds = <TResult = IKeyValue>(array: EntityIdT[],
                                                     valueAccessor: (itm: EntityIdT) => AnyT): TResult =>
  asDynamicObject<EntityIdT, TResult>(array, (itm) => itm, valueAccessor);

/**
 * @stable [29.08.2020]
 * @param entity
 */
const fromMultiFieldValueToDefinedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] =>
    MultiFieldUtils.multiFieldValueAsEntities(entity) || [];

/**
 * @stable [14.10.2019]
 * @param {MultiFieldValueOrEntityIdT} value
 * @returns {number}
 */
export const asMultiFieldEntitiesLength = (value: MultiFieldValueOrEntityIdT): number =>
  ConditionUtils.ifNotNilThanValue(
    value,
    () => (
      MultiFieldUtils.isNotMultiEntity(value)
        ? MultiFieldUtils.notMultiFieldValueAsEntities(value as NotMultiFieldValueT)
        : MultiFieldUtils.multiFieldValueAsEntities(value as IReduxMultiEntity)
    ).length,
    0
  );

/**
 * @stable [14.10.2019]
 * @param {MultiFieldValueT<TEntity extends IEntity>} value
 * @param {number} entitiesCountLimit
 * @returns {TEntity[]}
 */
export const asOrderedMultiFieldEntities = <TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>,
                                                                               entitiesCountLimit: number): TEntity[] => {
  const result = ArrayUtils.makeArray<TEntity>(entitiesCountLimit);
  const multiFieldEntities = MultiFieldUtils.multiFieldValueAsEntities(value);

  if (Array.isArray(multiFieldEntities)) {
    let cursor = 0;
    result.forEach((_, index) => {
      const entity = multiFieldEntities[index];
      if (!R.isNil(entity)) {
        if (entity.newEntity) {
          result[entity.index] = entity;
        } else {
          result[cursor++] = entity;
        }
      }
    });
  }
  return result;
};

// TODO Deprecated
/**
 * @deprecated
 */
export const buildMultiItemEntity = <TEntity extends IEntity = IEntity>(name: string,
                                                                        value: AnyT,
                                                                        rawData: TEntity,
                                                                        newEntity?: boolean): IMultiItemEntity =>
  defValuesFilter<IMultiItemEntity, IMultiItemEntity>({id: rawData.id, value, name, rawData, newEntity});

/**
 * @stable [19.11.2019]
 * @param {TEntity} original
 * @param {MultiFieldValueT<TEntity extends IEntity>} multiFieldEntity
 * @returns {{id: number}}
 */
export const buildNewPhantomMultiItem =
  <TEntity extends IEntity = IEntity>(original: TEntity,
                                      multiFieldEntity: MultiFieldValueT<TEntity>): TEntity => ({
    ...original as AnyT,
    id: arrayNextMinNegativeValue(MultiFieldUtils.multiFieldValueAsEntitiesIds(multiFieldEntity) as number[] || []),
  });

/**
 * @stable [16.05.2020]
 */
export class FieldUtils {
  public static readonly asActualFieldValue = asActualFieldValue;                                                 /* @stable [16.05.2020] */
  public static readonly asDynamicObject = asDynamicObject;                                                       /* @stable [27.10.2020] */
  public static readonly asDynamicObjectFromIds = asDynamicObjectFromIds;                                         /* @stable [28.10.2020] */
  public static readonly dynamicFieldName = dynamicFieldName;                                                     /* @stable [29.06.2020] */
  public static readonly dynamicFieldValue = dynamicFieldValue;                                                   /* @stable [29.06.2020] */
  public static readonly fromMultiFieldValueToDefinedEntities = fromMultiFieldValueToDefinedEntities;             /* @stable [16.05.2020] */
}
