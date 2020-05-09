import * as R from 'ramda';

import {
  IExtendedFormEntity,
  IFormProps,
  IGenericFieldEntity2,
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
  isTouched,
  isValid,
} from './wrapper';
import { isDef } from './type';
import { nvl } from './nvl';
import { selectEditableEntity } from './mapper';
import { isTabActive } from './tab';
import {
  selectForm,
  Selectors,
} from './select';
import { isObjectNotEmpty } from './object';

/**
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} wrapper
 * @param {string} fieldName
 * @returns {AnyT}
 */
const getFieldValueByName = <TEntity = IEntity>(wrapper: IExtendedFormEntity<TEntity>,
                                                fieldName: string): AnyT => (
  ifNotEmptyThanValue(
    fieldName,
    () => (
      ifNotNilThanValue(
        (
          R.isNil(wrapper.entity)
            ? Selectors.formEntityChanges(wrapper)
            : wrapper.entity
        ),
        (data) => data[fieldName],
        UNDEF_SYMBOL
      )
    ),
    UNDEF_SYMBOL
  )
);

/**
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} wrapper
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldValue = <TEntity = IEntity>(wrapper: IExtendedFormEntity<TEntity>,
                                                     fieldProps: IGenericFieldEntity2): AnyT =>
  isDef(fieldProps.value)
    ? fieldProps.value
    : getFieldValueByName(wrapper, fieldProps.name);

/**
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} wrapper
 * @param {IGenericFieldEntity2} fieldProps
 * @param {IGenericFieldEntity2} defaultFieldProps
 * @returns {AnyT}
 */
export const getFormFieldDisplayValue = <TEntity = IEntity>(wrapper: IExtendedFormEntity<TEntity>,
                                                            fieldProps: IGenericFieldEntity2,
                                                            defaultFieldProps?: IGenericFieldEntity2): AnyT =>
  isDef(fieldProps.displayValue)
    ? fieldProps.displayValue
    : (
      getFieldValueByName(
        wrapper,
        fieldProps.displayName || ifNotNilThanValue(defaultFieldProps, () => defaultFieldProps.displayName)
      )
    );

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldOriginalValue = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>,
                                                                             fieldProps: IGenericFieldEntity2): AnyT =>
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
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} entity
 * @returns {boolean}
 */
export const isFormChanged = <TEntity = IEntity>(entity: IExtendedFormEntity<TEntity>): boolean =>
  isObjectNotEmpty(Selectors.formEntityChanges(entity));

/**
 * @stable [23.04.2020]
 * @param {IFormProps<TEntity>} entity
 * @returns {boolean}
 */
export const isFormDirty = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => (
      isAlwaysDirty(entity) || ifNotNilThanValue(selectForm(entity), (form) => isDirty(form), false)
    ),
    false
  );

/**
 * @stable [23.04.2020]
 * @param {IFormProps<TEntity>} entity
 * @returns {boolean}
 */
export const isFormTouched = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => ifNotNilThanValue(selectForm(entity), (form) => isTouched(form), false),
    false
  );

/**
 * @stable [16.01.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormValid = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  isValid(entity) && isValid(selectForm(entity)); // Redux or auto validation

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
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = <TEntity extends IEntity = IEntity>(formEntity: IFormProps<TEntity>,
                                                                       fieldProps: IGenericFieldEntity2): boolean =>
  nvl(
    ifNotNilThanValue(fieldProps, () => fieldProps.readOnly),
    ifNotNilThanValue(formEntity, () => formEntity.readOnly),
  ) === true;

/**
 * @stable [23.03.2020]
 * @param {IFormProps} formProps
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IGenericFieldEntity2): boolean =>
  R.isNil(fieldProps.disabled) ? isFormDisabled(formProps) : isDisabled(fieldProps);

/**
 * @stable [23.03.2020]
 * @param {IFormProps} formProps
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {boolean}
 */
export const isFormFieldChangeable = (formProps: IFormProps,
                                      fieldProps: IGenericFieldEntity2): boolean =>
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
