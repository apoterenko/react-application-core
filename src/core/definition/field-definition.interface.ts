import {
  InputHTMLAttributes,
  RefAttributes,
  TextareaHTMLAttributes,
} from 'react';

import {
  AnyT,
  EntityIdT,
  IActionsPosition,
  IActionsWrapper,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  IChangeableWrapper,
  IClassNameWrapper,
  ICurrentWrapper,
  ICursorWrapper,
  IDateWrapper,
  IDefaultValueWrapper,
  IDialogOpenedWrapper,
  IDisabledWrapper,
  IDisableLabelWrapper,
  IDisplayNameWrapper,
  IDisplayValueOnlyWrapper,
  IDisplayValueWrapper,
  IEmptyValueWrapper,
  IEntity,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFormatWrapper,
  IFullWrapper,
  IHeaderFormatWrapper,
  IKeepChangesWrapper,
  ILabelWrapper,
  IMaskWrapper,
  IMaxDateWrapper,
  IMenuRenderedWrapper,
  IMinDateWrapper,
  INameWrapper,
  INextWrapper,
  IOnClickWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  IRangeEnabledWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  IStepWrapper,
  ISyntheticCursorWrapper,
  ITabIndexWrapper,
  ITitleWrapper,
  ITypeWrapper,
  IUseKeyboardWrapper,
  IValueWrapper,
  IVisibleWrapper,
  IWaitingForDataWrapper,
  IYearWrapper,
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import { ICalendarConfigurationWrapperEntity } from './calendar-definition.interface';
import { IComponentCtor } from './component-definition.interface';
import { IDelayedChangesEntity } from './delayed-changes-definition.interface';
import { IDialogConfigurationWrapperEntity } from './dialog-definition.interface';
import { IMultiEntity } from './entity-definition.interface';
import { IPlaceFieldProps } from './place-definition.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';
export const FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;
export const FIELD_VALUE_TO_RESET = null;
export const ID_FIELD_NAME = 'id';

/**
 * @stable [27.05.2019]
 */
export interface IGenericFieldEntity
  extends IActionsPosition<FieldActionPositionsEnum>,
    IActionsWrapper<IFieldActionEntity[]>,
    IAutoCompleteWrapper,
    IAutoFocusWrapper,
    IChangeableWrapper,
    IDefaultValueWrapper,
    IDelayedChangesEntity,
    IDisabledWrapper,
    IDisplayNameWrapper,
    IDisplayValueOnlyWrapper,
    IDisplayValueWrapper<string | ((value: AnyT) => string)>,
    IEmptyValueWrapper,
    IFieldRenderedWrapper,
    IFullWrapper,
    IKeepChangesWrapper,
    ILabelWrapper,
    IMaskWrapper,
    INameWrapper,
    IOriginalValueWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IPreventFocusWrapper,
    IProgressWrapper,
    IReadOnlyWrapper,
    IRenderedWrapper,
    IRequiredWrapper,
    IStepWrapper,
    ISyntheticCursorWrapper,
    ITabIndexWrapper,
    ITypeWrapper<StringNumberT>,
    IUseKeyboardWrapper,
    IValueWrapper,
    IVisibleWrapper {
}

/**
 * @stable [28.09.2019]
 */
export interface IFieldChangeEntity
  extends INameWrapper,
    IValueWrapper,
    IRawDataWrapper {
}

/**
 * @stable [28.09.2019]
 */
export interface IFieldsChangesEntity
  extends IFieldsWrapper<IFieldChangeEntity[]> {
}

/**
 * @stable [28.09.2019]
 */
export type FieldChangeEntityT = IFieldChangeEntity | IFieldsChangesEntity;

/**
 * @stable [02.10.2019]
 */
export type MultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | IMultiEntity;
export type MultiFieldSingleValueT = IMultiEntity | EntityIdT;
export type NotMultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | EntityIdT;

/**
 * @stable [30.10.2019]
 */
export enum FieldActionTypesEnum {
  ATTACH_FILE = 'attach_file',
  CALENDAR = 'calendar',
  CLOSE = 'close',
  DOWNLOAD = 'download',
  DROP_DOWN = 'dropdown',
  VIDEO = 'video',
}

/**
 * @stable [28.10.2019]
 */
export interface IFieldActionEntity
  extends IClassNameWrapper,
    IDisabledWrapper<boolean | (() => boolean)>,
    IOnClickWrapper,
    ITitleWrapper,
    ITypeWrapper {
}

/**
 * @stable [09.05.2018]
 */
export interface IMaskedInputCtor
  extends IComponentCtor {
  inputElement: HTMLInputElement;
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldInputAttributes
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldTextAreaAttributes
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    RefAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [28.10.2018]
 */
export type IFieldComplexInputAttributes = IFieldInputAttributes | IFieldTextAreaAttributes;

/**
 * @stable [30.10.2019]
 */
export enum FieldActionPositionsEnum {
  LEFT,
  RIGHT,
}

/**
 * @default-field-entity
 * @stable [24.11.2019]
 */
export const GENERIC_FIELD_NO_AUTO_COMPLETE_ENTITY = Object.freeze<IGenericFieldEntity>({
  autoComplete: 'new-password',
});

/**
 * @default-field-entity
 * @stable [24.11.2019]
 */
export const GENERIC_FIELD_PASSWORD_ENTITY = Object.freeze<IGenericFieldEntity>({
  ...GENERIC_FIELD_NO_AUTO_COMPLETE_ENTITY,
  type: 'password',
});

/**
 * @generic-entity
 * @stable [07.01.2020]
 */
export interface IGenericDateFieldEntity
  extends ICalendarConfigurationWrapperEntity,
    IDialogConfigurationWrapperEntity,
    IFormatWrapper,
    IHeaderFormatWrapper,
    IMaxDateWrapper<Date>,
    IMinDateWrapper<Date>,
    IRangeEnabledWrapper {
}

/**
 * @generic-state
 * @stable [17.01.2020]
 */
export interface IGenericDateFieldState
  extends ICurrentWrapper<Date>,
    ICursorWrapper<Date>,
    IDateWrapper<Date>,
    IDialogOpenedWrapper,
    INextWrapper<Date>,
    IYearWrapper {
}

/**
 * @generic-entity
 * @stable [07.01.2020]
 */
export interface IGenericBaseCheckboxEntity
  extends IDisableLabelWrapper {
}

/**
 * @generic-state
 * @stable [11.01.2020]
 */
export interface IGenericBaseSelectState
  extends IMenuRenderedWrapper,
    IWaitingForDataWrapper {
}

/**
 * @default-field-entity
 * @stable [15.01.2020]
 */
export const QUICK_SEARCH_FIELD_ENTITY = Object.freeze<IBaseSelectProps>({
  expandActionRendered: false,
  menuConfiguration: {centeredMenu: false, useFilter: false},
  preventFocus: false,
});

/**
 * @default-field-entity
 * @stable [15.01.2020]
 */
export const ZIP_CODE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...QUICK_SEARCH_FIELD_ENTITY,
  placeActionRendered: false,
  useZipCode: true,
});
