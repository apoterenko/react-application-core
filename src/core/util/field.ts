import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
  IKeyValue,
  UNDEF,
} from '../definitions.interface';
import {
  FIELD_DISPLAY_EMPTY_VALUE,
  FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES,
  IMultiEntity,
  MultiFieldEntityT,
} from '../definition';
import { isNotMultiEntity } from './entity';
import { shallowClone } from './clone';

const DYNAMIC_FIELD_SEPARATOR = '-';

/**
 * @stable [27.08.2019]
 * @param {EntityIdT} key
 * @returns {string}
 */
export const dynamicFieldName = (key: EntityIdT): string => `$$dynamicField${DYNAMIC_FIELD_SEPARATOR}${key}`;

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
 * @stable [31.08.2019]
 * @param {AnyT} value
 * @returns {AnyT}
 */
export const toAlwaysDirtyFieldValue = (value: AnyT): AnyT => value === FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES
  ? FIELD_DISPLAY_EMPTY_VALUE
  : value;

/**
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT} entity
 * @param {Map<EntityIdT, TItem extends IEntity>} mappedSourcedItems
 * @returns {TItem[]}
 */
export const asMultiFieldEditedEntities =
  <TItem extends IEntity = IEntity>(entity: MultiFieldEntityT,
                                    mappedSourcedItems?: Map<EntityIdT, TItem>): TItem[] => {
    const multiEntity = entity as IMultiEntity;
    if (R.isNil(entity)) {
      return UNDEF;
    }
    if (isNotMultiEntity(entity)) {
      return [];
    }
    const resultItems = new Map<EntityIdT, TItem>();
    const cachedSourceItems = mappedSourcedItems || new Map<EntityIdT, TItem>();
    if (R.isNil(mappedSourcedItems)) {
      multiEntity.source.forEach((originalItem) => cachedSourceItems.set(originalItem.id, originalItem as TItem));
    }

    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const cachedResultItem = resultItems.get(editedItemId);

      // Collect the changes
      const editedItem0 = cachedResultItem || shallowClone<TItem>(cachedSourceItems.get(editedItemId));
      editedItem0[editedItem.name] = editedItem.value;

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, editedItem0);
      }
    });
    return Array.from(resultItems.values());
  };
