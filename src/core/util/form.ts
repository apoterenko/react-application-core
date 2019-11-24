import * as R from 'ramda';

import {
  IFormEntity,
  IFormWrapperEntity,
  IGenericFieldEntity,
  IGenericFormEntity,
} from '../definition';
import {
  AnyT,
  IEntity,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
} from './cond';
import {
  inProgress,
  isValid,
} from './wrapper';
import { isDef } from './type';
import { nvl } from './nvl';
import { selectEditableEntity } from './mapper';

/**
 * @stable [16.11.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} formWrapperEntity
 * @param {IGenericFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldValue = <TEntity extends IEntity = IEntity>(formWrapperEntity: IFormWrapperEntity<TEntity>,
                                                                     fieldProps: IGenericFieldEntity): AnyT =>
  isDef(fieldProps.value)
    ? fieldProps.value
    : (
      ifNotEmptyThanValue(
        fieldProps.name,
        (fieldName) => ifNotNilThanValue(
          R.isNil(formWrapperEntity.entity)
            ? ifNotNilThanValue(formWrapperEntity.form, (form) => form.changes)
            : formWrapperEntity.entity,
          (data) => Reflect.get(data, fieldName),
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [16.11.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} formWrapperEntity
 * @param {IGenericFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldOriginalValue = <TEntity extends IEntity = IEntity>(formWrapperEntity: IFormWrapperEntity<TEntity>,
                                                                             fieldProps: IGenericFieldEntity): AnyT =>
  isDef(fieldProps.originalValue)
    ? fieldProps.originalValue
    : (
      ifNotNilThanValue(
        formWrapperEntity.originalEntity,
        (originalEntity) =>
          ifNotEmptyThanValue(fieldProps.name, (fieldName) => Reflect.get(originalEntity, fieldName), UNDEF_SYMBOL),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [25.09.2019]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityDisabled = <TEntity extends IEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => entity.disabled === true || isFormWrapperEntityInProgress(entity),
    false
  );

/**
 * @stable [25.10.2019]
 * @param {IFormEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityValid = <TEntity extends IEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  isValid(entity) && isValid(selectEditableEntity<TEntity>(entity)); // Redux or auto validation

/**
 * @stable [25.10.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormWrapperEntityInProgress = <TEntity extends IEntity = IEntity>(entity: IFormWrapperEntity<TEntity>): boolean =>
  inProgress(selectEditableEntity<TEntity>(entity));

/**
 * @stable [25.09.2019]
 * @param {IGenericFormEntity} formEntity
 * @param {IGenericFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formEntity: IGenericFormEntity,
                                    fieldProps: IGenericFieldEntity): boolean =>
  nvl(
    ifNotNilThanValue(fieldProps, () => fieldProps.readOnly),
    ifNotNilThanValue(formEntity, () => formEntity.readOnly),
  ) === true;
