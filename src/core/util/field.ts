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
  MultiFieldEntityT,
  NotMultiFieldEntityT,
} from '../definition';
import { ifNotNilThanValue } from './cond';
import {
  arrayNextMinNegativeValue,
  isArrayNotEmpty,
  makeArray,
} from './array';
import { isNotMultiEntity } from './entity';
import { TypeUtils } from './type';
import { nvl } from './nvl';
import { shallowClone } from './clone';
import {
  isDisabled,
  WrapperUtils,
} from './wrapper';
import { defValuesFilter } from './filter';

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
 * @stable [16.05.2020]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} entity
 * @returns {TEntity[]}
 */
const fromMultiFieldEntityToEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  if (isNotMultiEntity(entity)) {
    return entity as TEntity[];
  }
  const multiEntity = entity as IReduxMultiEntity<TEntity>;
  const sourceEntities = multiEntity.source || [];

  // Fill a cache
  const cachedSourceEntities = new Map<EntityIdT, TEntity>();
  sourceEntities.forEach((itm) => cachedSourceEntities.set(itm.id, itm));

  // Pass a map to optimize
  const editedEntities = asMultiFieldEditedEntities<TEntity>(entity, cachedSourceEntities);
  const cachedEditedEntities = new Map<EntityIdT, TEntity>();
  if (isArrayNotEmpty(editedEntities)) {
    editedEntities.forEach((itm) => cachedEditedEntities.set(itm.id, itm));
  }

  // Remove the deleted entities
  multiEntity.remove.forEach((itm) => cachedSourceEntities.delete(itm.id));

  return multiEntity.add.concat(
    Array.from(cachedSourceEntities.values())
      .map((itm) => nvl(cachedEditedEntities.get(itm.id), itm))
  );
};

/**
 * @stable [16.05.2020]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} entity
 * @returns {TEntity[]}
 */
const fromMultiFieldEntityToDefinedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[] =>
    fromMultiFieldEntityToEntities(entity) || [];

/**
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT} entity
 * @param {Map<EntityIdT, TItem extends IEntity>} mappedSourcedItems
 * @returns {TItem[]}
 */
export const asMultiFieldEditedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>,
                                      mappedSourcedItems?: Map<EntityIdT, TEntity>): TEntity[] => {
    const multiEntity = entity as IReduxMultiEntity<TEntity>;
    if (R.isNil(entity)) {
      return UNDEF;
    }
    if (isNotMultiEntity(entity)) {
      return [];
    }
    const resultItems = new Map<EntityIdT, TEntity>();
    const cachedSourceItems = mappedSourcedItems || new Map<EntityIdT, TEntity>();
    if (R.isNil(mappedSourcedItems)) {
      multiEntity.source.forEach((sourceEntity) => cachedSourceItems.set(sourceEntity.id, sourceEntity));
    }

    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const cachedResultItem = resultItems.get(editedItemId);

      // Collect the changes
      const $editedItem = cachedResultItem || shallowClone<TEntity>(cachedSourceItems.get(editedItemId));
      // @ts-ignore TODO
      $editedItem[editedItem.name] = editedItem.value;

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, $editedItem);
      }
    });
    return Array.from(resultItems.values());
  };

/**
 * @stable [22.11.2019]
 * @param {MultiFieldEntityT} entity
 * @returns {TEntity[]}
 */
export const asMultiFieldAddedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[] => {
    if (R.isNil(entity)) {
      return UNDEF;
    }
    if (isNotMultiEntity(entity)) {
      return [];
    }
    const multiEntity = entity as IReduxMultiEntity;
    return multiEntity.add as TEntity[];
  };

/**
 * @stable [14.10.2019]
 * @param {NotMultiFieldEntityT} value
 * @returns {IEntity[]}
 */
export const asEntitiesArray = <TEntity extends IEntity = IEntity>(value: NotMultiFieldEntityT<TEntity>): TEntity[] =>
  TypeUtils.isPrimitive(value) ? [{id: value} as TEntity] : value as TEntity[];

/**
 * @stable [14.10.2019]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {number}
 */
export const asMultiFieldEntitiesLength = (value: MultiFieldEntityT | EntityIdT): number => ifNotNilThanValue(
  value,
  () => (
    isNotMultiEntity(value)
      ? asEntitiesArray(value as NotMultiFieldEntityT)
      : fromMultiFieldEntityToEntities(value as IReduxMultiEntity)
  ).length,
  0
);

/**
 * @stable [14.10.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} value
 * @param {number} entitiesCountLimit
 * @returns {TEntity[]}
 */
export const asOrderedMultiFieldEntities = <TEntity extends IEntity = IEntity>(value: MultiFieldEntityT<TEntity>,
                                                                               entitiesCountLimit: number): TEntity[] => {
  const result = makeArray(entitiesCountLimit);
  const multiFieldEntities = fromMultiFieldEntityToEntities(value);

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
 * @param {MultiFieldEntityT<TEntity extends IEntity>} multiFieldEntity
 * @param {(entity: TEntity, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export const asMultiFieldMappedEntities =
  <TEntity extends IEntity = IEntity, TResult = TEntity>(multiFieldEntity: MultiFieldEntityT<TEntity> | EntityIdT[],
                                                         mapper: (entity: TEntity, index: number) => TResult): TResult[] =>
    ifNotNilThanValue(
      fromMultiFieldEntityToEntities(multiFieldEntity as MultiFieldEntityT<TEntity>),
      (result) => result.map(mapper),
      UNDEF_SYMBOL
    );

/**
 * @stable [14.10.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity> | EntityIdT[]} multiFieldEntity
 * @returns {EntityIdT[]}
 */
export const asMultiFieldMappedEntitiesIds =
  <TEntity extends IEntity = IEntity, TResult = TEntity>(multiFieldEntity: MultiFieldEntityT<TEntity> | EntityIdT[]): EntityIdT[] =>
    asMultiFieldMappedEntities<IEntity, EntityIdT>(multiFieldEntity, (entity: IEntity) => entity.id);

/**
 * @stable [22.11.2019]
 * @param {string} name
 * @param {AnyT} value
 * @param {TEntity} rawData
 * @param {boolean} newEntity
 * @returns {IMultiItemEntity}
 */
export const buildMultiItemEntity = <TEntity extends IEntity = IEntity>(name: string,
                                                                        value: AnyT,
                                                                        rawData: TEntity,
                                                                        newEntity?: boolean): IMultiItemEntity =>
  defValuesFilter<IMultiItemEntity, IMultiItemEntity>({id: rawData.id, value, name, rawData, newEntity});

/**
 * @stable [22.11.2019]
 * @param {Partial<IReduxMultiEntity<TEntity extends IEntity>>} initial
 * @returns {IReduxMultiEntity<TEntity extends IEntity>}
 */
export const multiEntityFactory =
  <TEntity extends IEntity = IEntity>(initial: Partial<IReduxMultiEntity<TEntity>>): IReduxMultiEntity<TEntity> => ({
    add: initial.add || [],
    edit: initial.edit || [],
    remove: initial.remove || [],
    source: initial.source || [],
  });

/**
 * @stable [19.11.2019]
 * @param {TEntity} original
 * @param {MultiFieldEntityT<TEntity extends IEntity>} multiFieldEntity
 * @returns {{id: number}}
 */
export const buildNewPhantomMultiItem =
  <TEntity extends IEntity = IEntity>(original: TEntity,
                                      multiFieldEntity: MultiFieldEntityT<TEntity>): TEntity => ({
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
  public static readonly fromMultiFieldEntityToDefinedEntities = fromMultiFieldEntityToDefinedEntities;           /* @stable [16.05.2020] */
  public static readonly fromMultiFieldEntityToEntities = fromMultiFieldEntityToEntities;                         /* @stable [16.05.2020] */
  public static readonly isFieldInactive = isFieldInactive;                                                       /* @stable [02.08.2020] */
}
