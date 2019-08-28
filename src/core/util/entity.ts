import * as R from 'ramda';

import { IEntity } from '../definitions.interface';
import {
  IEditableEntity,
  IEntityFormEntity,
} from '../entities-definitions.interface';
import { IExtendedEntity } from '../definition';
import { validate, ValidatorRuleEnum } from './validator';

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
 * @param {IEntityFormEntity<TEntity extends IEntity>} entity
 * @param {Record<string, ValidatorRuleEnum[]>} editRules
 * @param {Record<string, ValidatorRuleEnum[]>} createRules
 * @returns {boolean}
 */
export const canSubmitEntityFormEntity = <TEntity extends IEntity>(entity: IEntityFormEntity<TEntity>,
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
 * @param {IEntityFormEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isEntityFormEntityBusy = <TEntity extends IEntity>(entity: IEntityFormEntity<TEntity>): boolean =>
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
