import * as R from 'ramda';

import { EntityIdT, IEntity, IKeyValue, AnyT } from '../definitions.interface';

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
