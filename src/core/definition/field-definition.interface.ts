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
  IAllowEmptyFilterValueWrapper,
  IAnchoredWrapper,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  ICalendarActionRenderedWrapper,
  IChangeableWrapper,
  IClassNameWrapper,
  ICurrentWrapper,
  ICursorWrapper,
  IDefaultValueWrapper,
  IDelayTimeoutWrapper,
  IDialogOpenedWrapper,
  IDictionaryWrapper,
  IDisabledWrapper,
  IDisableLabelWrapper,
  IDisplayNameWrapper,
  IDisplayValueRenderedOnlyWrapper,
  IDisplayValueWrapper,
  IEmptyValueWrapper,
  IEntity,
  IExpandActionRenderedWrapper,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IForceReloadWrapper,
  IForceUseLocalFilterWrapper,
  IFormatWrapper,
  IFromToEntity,
  IFullWrapper,
  IHeaderFormatWrapper,
  IInlineWrapper,
  IKeepChangesWrapper,
  ILabelWrapper,
  IMaskWrapper,
  IMaxDateWrapper,
  IMenuAnchorElementWrapper,
  IMenuRenderedWrapper,
  IMinDateWrapper,
  INameWrapper,
  INextWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOptionsWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPlainValueWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
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
  IWaitingForOptionsWrapper,
  IYearWrapper,
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import { ICalendarConfigurationEntity } from './calendar-definition.interface';
import { ICalendarEntityConfigurationEntity } from './date-definition.interface';
import { IComponentCtor } from './component-definition.interface';
import { IDelayedChangesEntity } from './delayed-changes-definition.interface';
import { IDialogConfigurationEntity } from './dialog-definition.interface';
import { IMultiEntity } from './entity-definition.interface';
import { IFieldProps } from '../configurations-definitions.interface'; // TODO
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';
export const FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;
export const FIELD_VALUE_TO_RESET = null;
export const ID_FIELD_NAME = 'id';

/**
 * @generic-entity
 * @stable [27.05.2019]
 */
export interface IGenericBaseFieldEntity
  extends IActionsPosition<FieldActionPositionsEnum>,
    IActionsWrapper<IFieldActionEntity[]>,
    IAutoCompleteWrapper,
    IAutoFocusWrapper,
    IChangeableWrapper,
    IDefaultValueWrapper,
    IDelayedChangesEntity,
    IDisabledWrapper,
    IDisplayNameWrapper,
    IDisplayValueRenderedOnlyWrapper,
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
    IPlainValueWrapper,
    IPreventFocusWrapper,
    IPreventManualChangesWrapper,                                             /* @stable [03.02.2020] */
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
 * @behavioral-entity
 * @stable [02.02.2020]
 */
export interface IBehavioralBaseFieldEntity
  extends IOnChangeWrapper {
}

/**
 * @behavioral-entity
 * @stable [02.02.2020]
 */
export interface IBehavioralFieldEntity
  extends IOnClickWrapper {
}

/**
 * @entity
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

export interface IFieldsPresets {
  [fieldName: string]: string | IFieldProps | ((field) => IFieldProps | string);
}

/**
 * @default-entity
 * @stable [24.11.2019]
 */
export const DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY = Object.freeze<IGenericBaseFieldEntity>({
  autoComplete: 'new-password',
});

/**
 * @default-entity
 * @stable [24.11.2019]
 */
export const DEFAULT_PASSWORD_FIELD_ENTITY = Object.freeze<IGenericBaseFieldEntity>({
  ...DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY,
  type: 'password',
});

/**
 * @generic-entity
 * @stable [07.01.2020]
 */
export interface IGenericDateFieldEntity
  extends ICalendarActionRenderedWrapper,
    ICalendarConfigurationEntity,
    ICalendarEntityConfigurationEntity,
    IDialogConfigurationEntity,
    IFormatWrapper,
    IHeaderFormatWrapper,
    IInlineWrapper,
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
    IDialogOpenedWrapper,
    IFromToEntity<string>,
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
    IProgressWrapper {
}

/**
 * @generic-entity
 * @stable [24.01.2020]
 */
export interface IGenericBaseSelectEntity
  extends IAllowEmptyFilterValueWrapper,
    IAnchoredWrapper,
    IDelayTimeoutWrapper,
    IDictionaryWrapper,
    IExpandActionRenderedWrapper,
    IForceReloadWrapper,
    IForceUseLocalFilterWrapper,
    IMenuAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IMenuConfigurationEntity,
    IOptionsWrapper<ISelectOptionEntity[]>,
    IWaitingForOptionsWrapper {
}

/**
 * @entity
 * @stable [25.01.2020]
 */
export interface ISelectOptionEntity<TRawData = {}>
  extends IMenuItemEntity<TRawData> {
}

/**
 * @default-entity
 * @stable [15.01.2020]
 */
export const DEFAULT_QUICK_SEARCH_FIELD_ENTITY = Object.freeze<IBaseSelectProps>({
  allowEmptyFilterValue: false,
  anchored: true,
  expandActionRendered: false,
  preventFocus: false,
});
