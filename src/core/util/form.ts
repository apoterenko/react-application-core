import * as R from 'ramda';

import {
  IExtendedFormEntity,
  IFieldProps,
  IFormProps,
  IGenericFieldEntity2,
  IPresetsFieldEntity,
  IPresetsTabEntity,
  IReduxFormHolderEntity,
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
  isAlwaysDirty,
  isAlwaysResettable,
  isDisabled,
  WrapperUtils,
} from './wrapper';
import { isDef } from './type';
import { nvl } from './nvl';
import { TabUtils } from './tab';
import {
  selectForm,
  Selectors,
} from './select';
import { FormEntityUtils } from './form-entity';

/**
 * @stable [05.06.2020]
 * @param {IFormProps} formProps
 * @param {IPresetsFieldEntity} presetsFieldEntity
 * @returns {boolean}
 */
const isFormFieldChangeable = (formProps: IFormProps,
                               presetsFieldEntity: IPresetsFieldEntity): boolean =>
  R.isNil(presetsFieldEntity.changeable)
    ? WrapperUtils.isChangeable(formProps)
    : WrapperUtils.isChangeable(presetsFieldEntity);

/**
 * @stable [11.05.2020]
 * @param {IFormProps<TEntity>} entity
 * @returns {boolean}
 */
const isFormValid = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  WrapperUtils.isValid(entity) && FormEntityUtils.inValid(entity);

/**
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} formEntity
 * @param {string} fieldName
 * @returns {AnyT}
 */
const getFieldValueByName = <TEntity = IEntity>(formEntity: IExtendedFormEntity<TEntity>,
                                                fieldName: string): AnyT => (
  ifNotEmptyThanValue(
    fieldName,
    () => (
      ifNotNilThanValue(
        (
          R.isNil(formEntity.entity)
            ? Selectors.formEntityChanges(formEntity)
            : formEntity.entity
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
 * @stable [11.05.2020]
 * @param {IExtendedFormEntity<TEntity>} formEntity
 * @param {IFieldProps} fieldProps
 * @param {IFieldProps} defaultFieldProps
 * @returns {AnyT}
 */
const getFormFieldDisplayValue = <TEntity = IEntity>(formEntity: IExtendedFormEntity<TEntity>,
                                                     fieldProps: IFieldProps,
                                                     defaultFieldProps?: IFieldProps): AnyT =>
  isDef(fieldProps.displayValue)
    ? fieldProps.displayValue
    : (
      getFieldValueByName(
        formEntity,
        fieldProps.displayName || ifNotNilThanValue(defaultFieldProps, () => defaultFieldProps.displayName)
      )
    );

/**
 * @stable [11.05.2020]
 * @param {IExtendedFormEntity<TEntity>} entity
 * @param {IFieldProps} fieldProps
 * @returns {AnyT}
 */
const getFormFieldOriginalValue = <TEntity = IEntity>(entity: IExtendedFormEntity<TEntity>,
                                                      fieldProps: IFieldProps): AnyT =>
  isDef(fieldProps.originalValue)
    ? fieldProps.originalValue
    : (
      ifNotNilThanValue(
        entity.originalEntity,
        (originalEntity) => ifNotEmptyThanValue(fieldProps.name, (fieldName) => originalEntity[fieldName], UNDEF_SYMBOL),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [23.03.2020]
 * @param {IFormProps<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormDisabled = <TEntity extends IEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  R.isNil(entity) ? false : (isDisabled(entity) || FormEntityUtils.inProgress(entity));

/**
 * @stable [23.04.2020]
 * @param {IFormProps<TEntity>} entity
 * @returns {boolean}
 */
export const isFormDirty = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => (
      isAlwaysDirty(entity) || ifNotNilThanValue(selectForm(entity), (form) => WrapperUtils.isDirty(form), false)
    ),
    false
  );

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
 * @stable [15.06.2020]
 * @param {IReduxFormHolderEntity<TEntity extends IEntity>} holderFormEntity
 * @param {IPresetsTabEntity} tabEntity
 * @returns {boolean}
 */
const isFormTabActive = <TEntity extends IEntity = IEntity>(holderFormEntity: IReduxFormHolderEntity<TEntity>,
                                                            tabEntity: IPresetsTabEntity): boolean =>
  TabUtils.isActive(Selectors.form(holderFormEntity), tabEntity);

/**
 * @stable [11.05.2020]
 */
export class FormUtils {
  public static readonly fieldDisplayValue = getFormFieldDisplayValue;                              /* @stable [11.05.2020] */
  public static readonly fieldOriginalValue = getFormFieldOriginalValue;                            /* @stable [11.05.2020] */
  public static readonly inProgress = FormEntityUtils.inProgress;                                   /* @stable [11.05.2020] */
  public static readonly isChanged = FormEntityUtils.isChanged;                                     /* @stable [11.05.2020] */
  public static readonly isFieldChangeable = isFormFieldChangeable;                                 /* @stable [05.06.2020] */
  public static readonly isTabActive = isFormTabActive;                                             /* @stable [15.06.2020] */
  public static readonly isTouched = FormEntityUtils.isTouched;                                     /* @stable [11.05.2020] */
  public static readonly isValid = isFormValid;                                                     /* @stable [11.05.2020] */
}
