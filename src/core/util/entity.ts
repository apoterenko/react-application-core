import * as R from 'ramda';

import { IEntity } from '../definitions.interface';
import {
  IEditableEntity,
  IFormWrapperEntity,
  IExtendedEntity,
} from '../definition';
import { validate, ValidatorRuleEnum } from './validator';
import { ifNotNilThanValue } from './cond';

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
 * @stable [30.01.2019]
 * @param {IEditableEntity<TEntity extends IEntity>} editableEntity
 * @returns {boolean}
 */
export const isEditableEntityBusy = <TEntity extends IEntity>(editableEntity: IEditableEntity<TEntity>): boolean =>
  editableEntity.progress === true;

/**
 * @stable [30.01.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isEntityFormEntityBusy = <TEntity extends IEntity>(entity: IFormWrapperEntity<TEntity>): boolean =>
  isEditableEntityBusy(entity.form);

/**
 * @stable [30.01.2019]
 * @param {IExtendedEntity<TEntity extends IEntity>} entityWrapper
 * @returns {boolean}
 */
export const isNewExtendedEntity = <TEntity extends IEntity>(entityWrapper: IExtendedEntity<TEntity>): boolean =>
  entityWrapper.newEntity === true;

/**
 * @stable [30.01.2019]
 * @param {IExtendedEntity<TEntity extends IEntity>} entityWrapper
 * @returns {boolean}
 */
export const doesExtendedEntityExist = <TEntity extends IEntity>(entityWrapper: IExtendedEntity<TEntity>): boolean =>
  !R.isNil(entityWrapper) && !isNewExtendedEntity(entityWrapper);

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
 * @stable [11.09.2019]
 * @param {IEditableEntity<TValue>} editableEntity
 * @returns {boolean}
 */
export const isEditableEntityValid = <TValue>(editableEntity: IEditableEntity<TValue>): boolean =>
  ifNotNilThanValue(
    editableEntity,
    () => R.isNil(editableEntity.valid) || editableEntity.valid === true,
    false
  );
