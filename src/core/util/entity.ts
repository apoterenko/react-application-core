import * as R from 'ramda';

import {
  EntityIdT,
  IEntity,
} from '../definitions.interface';
import {
  IEditableEntity,
  IExtendedEntity,
  IFormWrapperEntity,
  IMultiEntity,
  MultiFieldEntityT,
  ValidatorRuleEnum,
} from '../definition';
import { ifNotNilThanValue } from './cond';
import { isPrimitive } from './type';
import { validate } from './validator';

/**
 * @stable [30.01.2019]
 * @param {Record<string, ValidatorRuleEnum[]>} payloads
 * @param {IEditableEntity<TEntity extends IEntity>} editableEntity
 * @param {boolean} canSaveEmptyChanges
 * @returns {boolean}
 */
export const canSubmitEditableEntity = <TEntity extends IEntity>(payloads: Record<string, ValidatorRuleEnum[]>,
                                                                 editableEntity: IEditableEntity<TEntity>,
                                                                 canSaveEmptyChanges = false): boolean =>
  !editableEntity.progress
  && validate(payloads, editableEntity.changes).valid
  && (
    canSaveEmptyChanges || !R.isEmpty(editableEntity.changes)
  );

/**
 * @stable [30.01.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @param {Record<string, ValidatorRuleEnum[]>} editRules
 * @param {Record<string, ValidatorRuleEnum[]>} createRules
 * @returns {boolean}
 */
export const canSubmitEntityFormEntity = <TEntity extends IEntity>(entity: IFormWrapperEntity<TEntity>,
                                                                   editRules: Record<string, ValidatorRuleEnum[]>,
                                                                   createRules?: Record<string, ValidatorRuleEnum[]>): boolean =>
  canSubmitEditableEntity(
    doesExtendedEntityExist(entity) ? editRules : createRules || editRules,
    entity.form
  );

/**
 * @stable [19.10.2019]
 * @param {TEntity} entity
 * @returns {boolean}
 */
export const isNewEntity = <TEntity extends IEntity>(entity: TEntity): boolean =>
  R.isNil(entity) || R.isNil(entity.id);

/**
 * @stable [01.10.2019]
 * @param {IExtendedEntity<TEntity extends IEntity>} extendedEntity
 * @returns {boolean}
 */
export const isNewExtendedEntity = <TEntity extends IEntity>(extendedEntity: IExtendedEntity<TEntity>): boolean =>
  ifNotNilThanValue(
    extendedEntity,
    () => extendedEntity.newEntity === true,
    false
  );

/**
 * @stable [01.10.2019]
 * @param {IExtendedEntity<TEntity extends IEntity>} extendedEntity
 * @returns {boolean}
 */
export const doesExtendedEntityExist = <TEntity extends IEntity>(extendedEntity: IExtendedEntity<TEntity>): boolean =>
  !isNewExtendedEntity(extendedEntity);

/**
 * @stable [30.08.2019]
 * @param {TEntity} entity
 * @returns {string}
 */
export const entityAsFileName = <TEntity extends IEntity>(entity: TEntity): string => ifNotNilThanValue(
  entity,
  () => `${entity.id}${ifNotNilThanValue(entity.name, (name) => `-${name.replace(/ /g, '_')}`, '')}`,
  ''
);

/**
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {boolean}
 */
export const isNotMultiEntity = (value: MultiFieldEntityT | EntityIdT): boolean =>
  Array.isArray(value) || isPrimitive(value);
