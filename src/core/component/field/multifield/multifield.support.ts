import * as R from 'ramda';

import { IEntity, EntityIdT, UNDEF, AnyT } from '../../../definitions.interface';
import { orUndef, isPrimitive, orDefault, isDef, orNull } from '../../../util';
import {
  IMultiEntity,
  MultiFieldEntityT,
  NotMultiFieldEntityT,
  IMultiItemEntity,
  MultiFieldSingleValueT,
} from './multifield.interface';

export function toActualMultiItemEntities(entity: MultiFieldEntityT): IMultiItemEntity[] {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    const editedItems = {};
    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const editedItem0 = editedItems[editedItemId] || {
        ...multiEntity.source.find((originalEntity) => originalEntity.id === editedItemId),
      };
      editedItem0[editedItem.name] = editedItem.value;
      editedItems[editedItemId] = editedItem0;
    });
    const sourceItems = multiEntity.source || [];

    return R.sort<IMultiItemEntity>(
      (item1, item2) => sourceItems.findIndex((i) => i.id === item1.id) > sourceItems.findIndex((i) => i.id === item2.id) ? 1 : -1,
      multiEntity.add.concat(
        sourceItems.filter(
          (entity0) =>
            !multiEntity.remove.find((removeId) => removeId.id === entity0.id)
            && !multiEntity.edit.find((editedId) => editedId.id === entity0.id)
        ).concat(Object.keys(editedItems).map((editedItemId) => editedItems[editedItemId]))
      )
    );
  }
  return entity as IEntity[];
}

/**
 * @stable [27.06.2018]
 * @param {MultiFieldSingleValueT} multiFieldEntity
 * @returns {string}
 */
export const toLastAddedMultiItemEntity = (multiFieldEntity: MultiFieldSingleValueT): string => {
  if (R.isNil(multiFieldEntity)) {
    return null;
  }
  if (isPrimitive(multiFieldEntity)) {
    return String(multiFieldEntity);
  }
  const valueAsMultiEntity = multiFieldEntity as IMultiEntity;
  const add = valueAsMultiEntity.add;
  if (R.isNil(add)) {
    return null;
  }
  return orNull<string>(add.length > 0, () => String(add[add.length - 1].id));
};

/**
 * @stable [26.06.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @returns {EntityIdT[]}
 */
export const fromMultiFieldEntityToEntitiesIds = (multiFieldEntity: MultiFieldEntityT): EntityIdT[] =>
  fromMultiFieldEntityToEntities<IEntity, EntityIdT>(multiFieldEntity, (entity: IEntity) => entity.id);

/**
 * @stable [26.06.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @param {(entity: TItem, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export function fromMultiFieldEntityToEntities<TItem extends IEntity = IEntity, TResult = IEntity>(
  multiFieldEntity: MultiFieldEntityT,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = toActualMultiItemEntities(multiFieldEntity);
  return orUndef<TResult[]>(result, (): TResult[] => result.map<TResult>(mapper));
}

/**
 * @stable [24.06.2018]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {number}
 */
export const toActualMultiItemEntitiesLength = (value: MultiFieldEntityT | EntityIdT): number =>
  orDefault<number, number>(
    isDef(value),
    () => (
      (isNotMultiEntity(value)
          ? toMultiItemEntities(value as NotMultiFieldEntityT)
          : toActualMultiItemEntities(value as IMultiEntity)
      ).length
    ),
    0
  );

/**
 * @stable [23.06.2018]
 * @param {NotMultiFieldEntityT} value
 * @returns {IMultiItemEntity[]}
 */
export const toMultiItemEntities = (value: NotMultiFieldEntityT): IMultiItemEntity[] =>
  isPrimitive(value) ? [{id: value as EntityIdT}] : value as IMultiItemEntity[];

/**
 * @stable [24.06.2018]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {boolean}
 */
export const isNotMultiEntity = (value: MultiFieldEntityT | EntityIdT): boolean =>
  Array.isArray(value) || isPrimitive(value);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {(value: IMultiEntity) => IMultiItemEntity[]} converter
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiItemEntities = (value: MultiFieldEntityT,
                                         converter: (value: IMultiEntity) => IMultiItemEntity[],
                                         defaultValue: IMultiItemEntity[]): IMultiItemEntity[] =>
  isNotMultiEntity(value)
    ? orDefault<IMultiItemEntity[], IMultiItemEntity[]>(
        isDef(defaultValue),
        defaultValue,
        () => toMultiItemEntities(value as NotMultiFieldEntityT)
      )
    : (R.isNil(value) ? [] : converter(value as IMultiEntity));

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiEditItemEntities = (value: MultiFieldEntityT,
                                             defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.edit, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiRemoveItemEntities = (value: MultiFieldEntityT,
                                               defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.remove, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiAddItemEntities = (value: MultiFieldEntityT,
                                            defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.add, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiSourceItemEntities = (value: MultiFieldEntityT,
                                               defaultValue?: IMultiItemEntity[]): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.source, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {string} name
 * @param {AnyT} value
 * @param {IEntity} rawData
 * @returns {IMultiItemEntity}
 */
export const buildMultiEntity = (name: string,
                                 value: AnyT,
                                 rawData: IEntity): IMultiItemEntity => ({id: rawData.id, value, name, rawData});

/**
 * @stable [23.06.2018]
 * @param {string} fieldName
 * @param {MultiFieldEntityT} value
 * @param {(itm: IMultiItemEntity) => boolean} predicate
 * @param {(itm: IMultiItemEntity) => AnyT} nextValueFn
 * @returns {IMultiItemEntity}
 */
export const buildMultiEditItemEntityPayload = (fieldName: string,
                                                value: MultiFieldEntityT,
                                                predicate: (itm: IMultiItemEntity) => boolean,
                                                nextValueFn: (itm: IMultiItemEntity) => AnyT): IMultiItemEntity => {
  const sourceMultiItemEntities = extractMultiSourceItemEntities(value);
  const editedMultiItemEntities = extractMultiEditItemEntities(value);

  const editedMultiItemEntity = editedMultiItemEntities.find(predicate);
  const sourceMultiItemEntity = sourceMultiItemEntities.find(predicate);

  return buildMultiEntity(
    fieldName,
    nextValueFn(editedMultiItemEntity),
    sourceMultiItemEntity,
  );
};
