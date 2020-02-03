import * as R from 'ramda';

import {
  IFormExtendedEditableEntity,
  IFormProps,
  IGenericBaseFieldEntity,
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
  isAlwaysDirty,
  isDirty,
  isDisabled,
  isValid,
} from './wrapper';
import { isDef } from './type';
import { nvl } from './nvl';
import { selectEditableEntity } from './mapper';
import { isObjectNotEmpty } from './object';

/**
 * @stable [16.11.2019]
 * @param {IFormExtendedEditableEntity<TEntity extends IEntity>} fEntity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldValue = <TEntity extends IEntity = IEntity>(fEntity: IFormExtendedEditableEntity<TEntity>,
                                                                     fieldProps: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.value)
    ? fieldProps.value
    : (
      ifNotEmptyThanValue(
        fieldProps.name,
        (fieldName) => ifNotNilThanValue(
          R.isNil(fEntity.entity)
            ? ifNotNilThanValue(fEntity.form, (form) => form.changes)
            : fEntity.entity,
          (data) => Reflect.get(data, fieldName),
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [24.12.2019]
 * @param {IFormExtendedEditableEntity<TEntity extends IEntity>} fEntity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @param {IGenericBaseFieldEntity} defaultFieldProps
 * @returns {AnyT}
 */
export const getFormFieldDisplayValue = <TEntity extends IEntity = IEntity>(fEntity: IFormExtendedEditableEntity<TEntity>,
                                                                            fieldProps: IGenericBaseFieldEntity,
                                                                            defaultFieldProps?: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.displayValue)
    ? fieldProps.displayValue
    : (
      ifNotEmptyThanValue(
        fieldProps.displayName || ifNotNilThanValue(defaultFieldProps, () => defaultFieldProps.displayName),
        (displayName) => ifNotNilThanValue(
          R.isNil(fEntity.entity)
            ? ifNotNilThanValue(fEntity.form, (form) => form.changes)
            : fEntity.entity,
          (data) => Reflect.get(data, displayName),
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [16.11.2019]
 * @param {IFormExtendedEditableEntity<TEntity extends IEntity>} fEntity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldOriginalValue = <TEntity extends IEntity = IEntity>(fEntity: IFormExtendedEditableEntity<TEntity>,
                                                                             fieldProps: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.originalValue)
    ? fieldProps.originalValue
    : (
      ifNotNilThanValue(
        fEntity.originalEntity,
        (originalEntity) =>
          ifNotEmptyThanValue(fieldProps.name, (fieldName) => Reflect.get(originalEntity, fieldName), UNDEF_SYMBOL),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [16.01.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityDisabled = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => isDisabled(entity) || isFormWrapperEntityInProgress(entity),
    false
  );

/**
 * @stable [16.01.2020]
 * @param {IFormProps<TEntity extends IEntity>} formEntity
 * @returns {boolean}
 */
export const isFormEntityDirty = <TEntity extends IEntity = IEntity>(formEntity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    formEntity,
    () => (
      isAlwaysDirty(formEntity) || (
        ifNotNilThanValue(
          formEntity.form,
          (form) => isDirty(form) || isObjectNotEmpty(form.defaultChanges),
          false
        )
      )
    ),
    false
  );

/**
 * @stable [16.01.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormValid = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  isValid(entity) && isValid(selectEditableEntity<TEntity>(entity)); // Redux or auto validation

/**
 * @stable [25.10.2019]
 * @param {IFormExtendedEditableEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormWrapperEntityInProgress = <TEntity extends IEntity = IEntity>(entity: IFormExtendedEditableEntity<TEntity>): boolean =>
  inProgress(selectEditableEntity<TEntity>(entity));

/**
 * @stable [25.09.2019]
 * @param {IGenericFormEntity} formEntity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formEntity: IGenericFormEntity,
                                    fieldProps: IGenericBaseFieldEntity): boolean =>
  nvl(
    ifNotNilThanValue(fieldProps, () => fieldProps.readOnly),
    ifNotNilThanValue(formEntity, () => formEntity.readOnly),
  ) === true;
