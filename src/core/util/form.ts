import * as R from 'ramda';

import {
  IExtendedEntity,
  IExtendedFormEntity,
  IFieldProps,
  IFormProps,
  IGenericFieldEntity2,
  IGenericFormEntity,
  IPresetsFieldEntity,
  IPresetsFormEntity,
  IPresetsTabEntity,
  IReduxFormHolderEntity,
} from '../definition';
import {
  AnyT,
  IEntity,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  ConditionUtils,
  ifNotNilThanValue,
} from './cond';
import {
  isAlwaysResettable,
  isDisabled,
  WrapperUtils,
} from './wrapper';
import { TypeUtils } from './type';
import { TabUtils } from './tab';
import {
  selectForm,
  Selectors,
} from './select';
import { ObjectUtils } from './object';

/**
 * @stable [22.09.2020]
 * @param holderFormEntity
 * @param tabEntity
 */
const isFormHolderEntityTabActive = <TEntity = IEntity>(holderFormEntity: IReduxFormHolderEntity<TEntity>,
                                                        tabEntity: IPresetsTabEntity): boolean =>
  TabUtils.isActive(Selectors.form(holderFormEntity), tabEntity);

/**
 * @stable [02.08.2020]
 * @param entity
 */
const isFormHolderEntityTouched = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  WrapperUtils.isTouched(Selectors.form(entity));

/**
 * @stable [02.08.2020]
 * @param entity
 */
const isFormHolderEntityInProgress = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  WrapperUtils.inProgress(Selectors.form(entity));

/**
 * @stable [02.08.2020]
 * @param entity
 */
const isFormHolderEntityChanged = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  ObjectUtils.isObjectNotEmpty(Selectors.formHolderEntityChanges(entity));

/**
 * @stable [02.08.2020]
 * @param entity
 */
const isFormHolderEntityValid = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): boolean =>
  WrapperUtils.isValid(Selectors.form(entity));

/**
 * @stable [02.08.2020]
 * @param entity
 */
const isGenericFormEntityValid = <TEntity = IEntity>(entity: IGenericFormEntity<TEntity>): boolean =>
  WrapperUtils.isValid(entity) && isFormHolderEntityValid(entity);

/**
 * @stable [27.08.2020]
 * @param entity
 */
const isGenericFormEntityDisabled = <TEntity = IEntity>(entity: IGenericFormEntity<TEntity>): boolean =>
  WrapperUtils.isDisabled(entity) || isFormHolderEntityInProgress(entity);

/**
 * @stable [27.08.2020]
 * @param formProps
 */
const isGenericFormEntityReady = <TEntity = IEntity>(formProps: IGenericFormEntity<TEntity>): boolean =>
  isGenericFormEntityValid(formProps) && !isGenericFormEntityDisabled(formProps);

/**
 * @stable [10.09.2020]
 * @param extendedFormEntity
 * @param fieldName
 */
const getFieldValueByName = <TEntity = IEntity>(extendedFormEntity: IExtendedFormEntity<TEntity>,
                                                fieldName: string): unknown =>
  ConditionUtils.ifNotEmptyThanValue(
    fieldName,
    () => (
      ConditionUtils.ifNotNilThanValue(
        (
          R.isNil(extendedFormEntity.entity)
            ? Selectors.formHolderEntityChanges(extendedFormEntity)
            : extendedFormEntity.entity
        ),
        (data) => data[fieldName],
        UNDEF_SYMBOL
      )
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [06.05.2020]
 * @param {IExtendedFormEntity<TEntity>} wrapper
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {AnyT}
 */
export const getFormFieldValue = <TEntity = IEntity>(wrapper: IExtendedFormEntity<TEntity>,
                                                     fieldProps: IGenericFieldEntity2): AnyT =>
  TypeUtils.isDef(fieldProps.value)
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
  TypeUtils.isDef(fieldProps.displayValue)
    ? fieldProps.displayValue
    : (
      getFieldValueByName(
        formEntity,
        fieldProps.displayName || ConditionUtils.ifNotNilThanValue(defaultFieldProps, () => defaultFieldProps.displayName)
      )
    );

/**
 * @stable [10.09.2020]
 * @param entity
 * @param fieldProps
 */
const getFormFieldOriginalValue = <TEntity = IEntity>(entity: IExtendedEntity<TEntity>,
                                                      fieldProps: IFieldProps): unknown =>
  TypeUtils.isDef(fieldProps.originalValue)
    ? fieldProps.originalValue
    : (
      ConditionUtils.ifNotNilThanValue(
        entity.originalEntity,
        (originalEntity) => ConditionUtils.ifNotEmptyThanValue(
          fieldProps.name,
          (fieldName) => originalEntity[fieldName],
          UNDEF_SYMBOL
        ),
        UNDEF_SYMBOL
      )
    );

/**
 * @stable [23.04.2020]
 * @param {IFormProps<TEntity>} entity
 * @returns {boolean}
 */
export const isFormDirty = <TEntity = IEntity>(entity: IFormProps<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => (
      entity.alwaysDirty || ifNotNilThanValue(selectForm(entity), (form) => WrapperUtils.isDirty(form), false)
    ),
    false
  );

/**
 * @stable [21.08.2020]
 * @param formEntity
 * @param fieldEntity
 */
const isFormFieldReadOnly = (formEntity: IPresetsFormEntity,
                             fieldEntity: IPresetsFieldEntity): boolean =>
  R.isNil(fieldEntity.readOnly)
    ? WrapperUtils.isReadOnly(formEntity)
    : WrapperUtils.isReadOnly(fieldEntity);

/**
 * @stable [22.08.2020]
 * @param formEntity
 * @param fieldEntity
 */
const isFormFieldChangeable = (formEntity: IPresetsFormEntity,
                               fieldEntity: IPresetsFieldEntity): boolean =>
  R.isNil(fieldEntity.changeable)
    ? WrapperUtils.isChangeable(formEntity)
    : WrapperUtils.isChangeable(fieldEntity);

/**
 * @stable [23.03.2020]
 * @param {IFormProps} formProps
 * @param {IGenericFieldEntity2} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IGenericFieldEntity2): boolean =>
  R.isNil(fieldProps.disabled) ? isGenericFormEntityDisabled(formProps) : isDisabled(fieldProps);

/**
 * @stable [03.02.2020]
 * @param {IFormProps<TEntity extends IEntity>} formProps
 * @returns {boolean}
 */
export const isFormSubmittable = <TEntity extends IEntity = IEntity>(formProps: IFormProps<TEntity>): boolean =>
  isGenericFormEntityReady(formProps) && isFormDirty(formProps);

/**
 * @stable [23.03.2020]
 * @param {IFormProps<TEntity extends IEntity>} formProps
 * @returns {boolean}
 */
export const isFormResettable = <TEntity extends IEntity = IEntity>(formProps: IFormProps<TEntity>): boolean =>
  isAlwaysResettable(formProps)
  || (
    isFormDirty(formProps)
    && !isGenericFormEntityDisabled(formProps)
  );

/**
 * @stable [11.05.2020]
 */
export class FormUtils {
  public static readonly fieldDisplayValue = getFormFieldDisplayValue;                              /* @stable [11.05.2020] */
  public static readonly fieldOriginalValue = getFormFieldOriginalValue;                            /* @stable [11.05.2020] */
  public static readonly inProgress = isFormHolderEntityInProgress;                                 /* @stable [02.08.2020] */
  public static readonly isChanged = isFormHolderEntityChanged;                                     /* @stable [02.08.2020] */
  public static readonly isDisabled = isGenericFormEntityDisabled;                                  /* @stable [27.08.2020] */
  public static readonly isFieldChangeable = isFormFieldChangeable;                                 /* @stable [05.06.2020] */
  public static readonly isFieldReadOnly = isFormFieldReadOnly;                                     /* @stable [21.08.2020] */
  public static readonly isReady = isGenericFormEntityReady;                                        /* @stable [27.08.2020] */
  public static readonly isTabActive = isFormHolderEntityTabActive;                                 /* @stable [15.06.2020] */
  public static readonly isTouched = isFormHolderEntityTouched;                                     /* @stable [02.08.2020] */
  public static readonly isValid = isGenericFormEntityValid;                                        /* @stable [02.08.2020] */
}
