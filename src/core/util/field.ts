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
  FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES,
  IGenericFieldEntity,
  IMultiEntity,
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
import {
  isDef,
  isPrimitive,
} from './type';
import { nvl } from './nvl';
import { shallowClone } from './clone';
import {
  inProgress,
  isAlwaysReturnEmptyValueIfOriginalValue,
  isChangeable,
  isDisabled,
  isEmptyOriginalValueSet,
  isReadOnly,
} from './wrapper';

/**
 * @stable [30.10.2019]
 * @param {IGenericFieldEntity} config
 * @returns {AnyT}
 */
export const buildFinalFieldValue = (config: IGenericFieldEntity): AnyT => {
  const {emptyValue, originalValue, value} = config;
  const finalOriginalValue = isEmptyOriginalValueSet(config) ? emptyValue : originalValue;

  const result = isDef(finalOriginalValue) && R.equals(value, finalOriginalValue)
    ? FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES
    : value;
  return FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES === result
    ? (isAlwaysReturnEmptyValueIfOriginalValue(config) ? emptyValue : result)
    : result;
};

/**
 * @stable [28.10.2019]
 * @param {IGenericFieldEntity} props
 * @returns {boolean}
 */
export const isFieldInactive = (props: IGenericFieldEntity): boolean =>
  isDisabled(props) || isReadOnly(props) || inProgress(props);

/**
 * @stable [30.10.2019]
 * @param {IGenericFieldEntity} props
 * @returns {boolean}
 */
export const isFieldNotModifiable = (props: IGenericFieldEntity): boolean =>
  isDisabled(props) || isReadOnly(props) || !isChangeable(props);

/**
 * @stable [30.10.2019]
 * @param {AnyT} value
 * @param {AnyT} emptyValue
 * @returns {boolean}
 */
export const isFieldValuePresent = (value: AnyT, emptyValue: AnyT): boolean =>
  isDef(value) && !R.equals(value, emptyValue);

/**
 * @stable [27.08.2019]
 * @param {EntityIdT} key
 * @returns {string}
 */
export const dynamicFieldName = (key: EntityIdT): string => `$$dynamicField-${key}`;

/**
 * @stable [28.08.2019]
 * @param {TEntity} object
 * @param {EntityIdT} key
 * @returns {AnyT}
 */
export const dynamicFieldValue = <TEntity extends IEntity>(object: TEntity, key: EntityIdT): AnyT =>
  Reflect.get(object, dynamicFieldName(key));

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
 * @stable [28.08.2019]
 * @param {EntityIdT[]} array
 * @param {(itm: EntityIdT) => EntityIdT} valueAccessor
 * @returns {IKeyValue}
 */
export const fromDynamicFieldsIdsArray = (array: EntityIdT[],
                                          valueAccessor: (itm: EntityIdT) => EntityIdT): IKeyValue =>
  fromDynamicFieldsArray<EntityIdT>(array, (itm) => itm, valueAccessor);

/**
 * @stable [13.10.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} entity
 * @returns {TEntity[]}
 */
export const asMultiFieldEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[] => {
  const before = Date.now();
  if (R.isNil(entity)) {
    return UNDEF;
  }
  if (isNotMultiEntity(entity)) {
    return entity as TEntity[];
  }
  const multiEntity = entity as IMultiEntity<TEntity>;
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
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT} entity
 * @param {Map<EntityIdT, TItem extends IEntity>} mappedSourcedItems
 * @returns {TItem[]}
 */
export const asMultiFieldEditedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>,
                                      mappedSourcedItems?: Map<EntityIdT, TEntity>): TEntity[] => {
    const multiEntity = entity as IMultiEntity<TEntity>;
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
      const editedItem0 = cachedResultItem || shallowClone<TEntity>(cachedSourceItems.get(editedItemId));
      editedItem0[editedItem.name] = editedItem.value;

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, editedItem0);
      }
    });
    return Array.from(resultItems.values());
  };

/**
 * @stable [14.10.2019]
 * @param {NotMultiFieldEntityT} value
 * @returns {IEntity[]}
 */
export const asEntitiesArray = <TEntity extends IEntity = IEntity>(value: NotMultiFieldEntityT<TEntity>): TEntity[] =>
  isPrimitive(value) ? [{id: value} as TEntity] : value as TEntity[];

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
      : asMultiFieldEntities(value as IMultiEntity)
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
  const multiFieldEntities = asMultiFieldEntities<TEntity>(value);

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
      asMultiFieldEntities(multiFieldEntity as MultiFieldEntityT<TEntity>),
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
