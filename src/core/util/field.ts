import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
  IKeyValue,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  FieldConstants,
  IGenericFieldEntity,
  IGenericFieldEntity2,
  IMultiItemEntity,
  IReduxMultiEntity,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  NotMultiFieldValueT,
} from '../definition';
import { ifNotNilThanValue } from './cond';
import {
  arrayNextMinNegativeValue,
  makeArray,
} from './array';
import { TypeUtils } from './type';
import { NvlUtils } from './nvl';
import {
  isDisabled,
  WrapperUtils,
} from './wrapper';
import { defValuesFilter } from './filter';
import { ObjectUtils } from './object';
import { MultiFieldUtils } from './multi-field';

/**
 * @stable [18.05.2020]
 * @param {IGenericFieldEntity2} config
 * @returns {AnyT}
 */
const asActualFieldValue = (config: IGenericFieldEntity2): AnyT => {
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
 * @stable [02.08.2020]
 * @param entity
 */
const isFieldInactive = (entity: IGenericFieldEntity): boolean =>
  isDisabled(entity) || WrapperUtils.isReadOnly(entity) || WrapperUtils.inProgress(entity);

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
 * @stable [28.08.2019]
 * @param {TEntity[]} array
 * @param {(itm: TEntity) => EntityIdT} keyAccessor
 * @param {(itm: TEntity) => EntityIdT} valueAccessor
 * @returns {IKeyValue}
 */
export const fromDynamicFieldsArray = <TEntity extends IEntity | EntityIdT>(array: TEntity[],
                                                                            keyAccessor: (itm: TEntity) => EntityIdT,
                                                                            valueAccessor: (itm: TEntity) => EntityIdT): IKeyValue =>
  R.mergeAll(array.map((itm) => ({
      [dynamicFieldName(keyAccessor(itm))]: valueAccessor(itm),
    }))
  );

/**
 * @stable [14.02.2020]
 * @param {EntityIdT[]} array
 * @param {(itm: EntityIdT) => AnyT} valueAccessor
 * @returns {IKeyValue}
 */
export const fromDynamicFieldsIdsArray = (array: EntityIdT[],
                                          valueAccessor: (itm: EntityIdT) => AnyT): IKeyValue =>
  fromDynamicFieldsArray<EntityIdT>(array, (itm) => itm, valueAccessor);

/**
 * @stable [29.08.2020]
 * @param entity
 */
const fromMultiFieldValueToEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  if (MultiFieldUtils.isNotMultiEntity(entity)) {
    return entity as TEntity[];
  }
  const multiEntity = entity as IReduxMultiEntity<TEntity>;
  const sourceEntities = multiEntity.source || [];

  // Fill a cache
  const cachedSourceEntities = new Map<EntityIdT, TEntity>();
  sourceEntities.forEach((itm) => cachedSourceEntities.set(itm.id, itm));

  // Pass a map to optimize
  const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities<TEntity>(entity, cachedSourceEntities);
  const cachedEditedEntities = new Map<EntityIdT, TEntity>();
  if (ObjectUtils.isObjectNotEmpty(editedEntities)) {
    editedEntities.forEach((itm) => cachedEditedEntities.set(itm.id, itm));
  }

  // Remove the deleted entities
  multiEntity.remove.forEach((itm) => cachedSourceEntities.delete(itm.id));

  return multiEntity.add.concat(
    Array.from(cachedSourceEntities.values())
      .map((itm) => NvlUtils.nvl(cachedEditedEntities.get(itm.id), itm))
  );
};

/**
 * @stable [29.08.2020]
 * @param entity
 */
const fromMultiFieldValueToDefinedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] =>
    fromMultiFieldValueToEntities(entity) || [];

/**
 * @stable [22.11.2019]
 * @param {MultiFieldValueT} entity
 * @returns {TEntity[]}
 */
export const asMultiFieldAddedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] => {
    if (R.isNil(entity)) {
      return UNDEF;
    }
    if (MultiFieldUtils.isNotMultiEntity(entity)) {
      return [];
    }
    const multiEntity = entity as IReduxMultiEntity;
    return multiEntity.add as TEntity[];
  };

/**
 * @stable [14.10.2019]
 * @param {MultiFieldValueOrEntityIdT} value
 * @returns {number}
 */
export const asMultiFieldEntitiesLength = (value: MultiFieldValueOrEntityIdT): number => ifNotNilThanValue(
  value,
  () => (
    MultiFieldUtils.isNotMultiEntity(value)
      ? MultiFieldUtils.notMultiFieldValueAsEntities(value as NotMultiFieldValueT)
      : fromMultiFieldValueToEntities(value as IReduxMultiEntity)
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
  const result = makeArray(entitiesCountLimit);
  const multiFieldEntities = fromMultiFieldValueToEntities(value);

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

/**
 * @stable [14.10.2019]
 * @param {MultiFieldValueT<TEntity extends IEntity>} multiFieldEntity
 * @param {(entity: TEntity, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export const asMultiFieldMappedEntities =
  <TEntity extends IEntity = IEntity, TResult = TEntity>(multiFieldEntity: MultiFieldValueT<TEntity> | EntityIdT[],
                                                         mapper: (entity: TEntity, index: number) => TResult): TResult[] =>
    ifNotNilThanValue(
      fromMultiFieldValueToEntities(multiFieldEntity as MultiFieldValueT<TEntity>),
      (result) => result.map(mapper),
      UNDEF_SYMBOL
    );

/**
 * @stable [14.10.2019]
 * @param {MultiFieldValueT<TEntity extends IEntity> | EntityIdT[]} multiFieldEntity
 * @returns {EntityIdT[]}
 */
export const asMultiFieldMappedEntitiesIds =
  <TEntity extends IEntity = IEntity, TResult = TEntity>(multiFieldEntity: MultiFieldValueT<TEntity> | EntityIdT[]): EntityIdT[] =>
    asMultiFieldMappedEntities<IEntity, EntityIdT>(multiFieldEntity, (entity: IEntity) => entity.id);

// TODO Deprecated
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
    id: arrayNextMinNegativeValue(asMultiFieldMappedEntitiesIds(multiFieldEntity) as number[] || []),
  });

/**
 * @stable [16.05.2020]
 */
export class FieldUtils {
  public static readonly asActualFieldValue = asActualFieldValue;                                                 /* @stable [16.05.2020] */
  public static readonly dynamicFieldName = dynamicFieldName;                                                     /* @stable [29.06.2020] */
  public static readonly dynamicFieldValue = dynamicFieldValue;                                                   /* @stable [29.06.2020] */
  public static readonly fromMultiFieldValueToDefinedEntities = fromMultiFieldValueToDefinedEntities;             /* @stable [16.05.2020] */
  public static readonly fromMultiFieldValueToEntities = fromMultiFieldValueToEntities;                           /* @stable [16.05.2020] */
  public static readonly isFieldInactive = isFieldInactive;                                                       /* @stable [02.08.2020] */
}
