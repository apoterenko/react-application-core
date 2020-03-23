import * as R from 'ramda';

import {
  IFormProps,
  IGenericBaseFieldEntity,
  ITabProps,
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
  isAlwaysResettable,
  isChangeable,
  isDirty,
  isDisabled,
  isValid,
} from './wrapper';
import { isDef } from './type';
import { nvl } from './nvl';
import { selectEditableEntity } from './mapper';
import { isObjectNotEmpty } from './object';
import { isTabActive } from './tab';
import { selectForm } from './select';

/**
 * [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldValue = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>,
                                                                     fieldProps: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.value)
    ? fieldProps.value
    : (
      ifNotEmptyThanValue(
        fieldProps.name,
        (fieldName) => ifNotNilThanValue(
          R.isNil(entity.entity)
            ? ifNotNilThanValue(entity.form, (form) => form.changes)
            : entity.entity,
          (data) => Reflect.get(data, fieldName),
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @param {IGenericBaseFieldEntity} defaultFieldProps
 * @returns {AnyT}
 */
export const getFormFieldDisplayValue = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>,
                                                                            fieldProps: IGenericBaseFieldEntity,
                                                                            defaultFieldProps?: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.displayValue)
    ? fieldProps.displayValue
    : (
      ifNotEmptyThanValue(
        fieldProps.displayName || ifNotNilThanValue(defaultFieldProps, () => defaultFieldProps.displayName),
        (displayName) => ifNotNilThanValue(
          R.isNil(entity.entity)
            ? ifNotNilThanValue(entity.form, (form) => form.changes)  // TODO Select form changes
            : entity.entity,
          (data) => Reflect.get(data, displayName),
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldOriginalValue = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>,
                                                                             fieldProps: IGenericBaseFieldEntity): AnyT =>
  isDef(fieldProps.originalValue)
    ? fieldProps.originalValue
    : (
      ifNotNilThanValue(
        entity.originalEntity,
        (originalEntity) =>
          ifNotEmptyThanValue(fieldProps.name, (fieldName) => Reflect.get(originalEntity, fieldName), UNDEF_SYMBOL),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [23.03.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormDisabled = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  R.isNil(entity) ? false : (isDisabled(entity) || isFormInProgress(entity));

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormDirty = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => (
      isAlwaysDirty(entity) || (
        ifNotNilThanValue(
          selectEditableEntity(entity),
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
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormInProgress = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  inProgress(selectEditableEntity<TEntity>(entity));

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} formEntity
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = <TEntity extends IEntity = IEntity>(formEntity: IFormProps<TEntity>,
                                                                       fieldProps: IGenericBaseFieldEntity): boolean =>
  nvl(
    ifNotNilThanValue(fieldProps, () => fieldProps.readOnly),
    ifNotNilThanValue(formEntity, () => formEntity.readOnly),
  ) === true;

/**
 * @stable [23.03.2020]
 * @param {IFormProps} formProps
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IGenericBaseFieldEntity): boolean =>
  R.isNil(fieldProps.disabled) ? isFormDisabled(formProps) : isDisabled(fieldProps);

/**
 * @stable [23.03.2020]
 * @param {IFormProps} formProps
 * @param {IGenericBaseFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldChangeable = (formProps: IFormProps,
                                      fieldProps: IGenericBaseFieldEntity): boolean =>
  R.isNil(fieldProps.changeable) ? isChangeable(formProps) : isChangeable(fieldProps);

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} formProps
 * @returns {boolean}
 */
export const isFormSubmittable = <TEntity extends IEntity = IEntity>(formProps: IFormProps<TEntity>): boolean =>
  isFormValid(formProps)
  && isFormDirty(formProps)
  && !isFormDisabled(formProps);

/**
 * @stable [23.03.2020]
 * @param {IFormProps<TEntity extends IEntity>} formProps
 * @returns {boolean}
 */
export const isFormResettable = <TEntity extends IEntity = IEntity>(formProps: IFormProps<TEntity>): boolean =>
  isAlwaysResettable(formProps)
  || (
    isFormDirty(formProps)
    && !isFormDisabled(formProps)
  );

/**
 * @stable [23.03.2020]
 * @param {IFormProps<TEntity extends IEntity>} formProps
 * @param {ITabProps} tab
 * @returns {boolean}
 */
export const isFormTabActive = <TEntity extends IEntity = IEntity>(formProps: IFormProps<TEntity>,
                                                                   tab: ITabProps): boolean =>
  isTabActive(selectForm(formProps), tab);
