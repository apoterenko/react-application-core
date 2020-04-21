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
  IDefaultValueWrapper,
  IDisabledWrapper,
  IDisableLabelWrapper,
  IDisplayNameWrapper,
  IDisplayValueRenderedOnlyWrapper,
  IDisplayValueWrapper,
  IEmptyValueWrapper,
  IEntity,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFormatWrapper,
  IFullWrapper,
  IKeepChangesWrapper,
  ILabelWrapper,
  IMaskWrapper,
  IMenuRenderedWrapper,
  INameWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPlainValueWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
  IProgressWrapper,
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
  IValidWrapper,
  IValueWrapper,
  IVisibleWrapper,
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import {
  DatesRangeValueT,
  DateTimeLikeTypeT,
} from './date-definition.interface';
import { IComponentCtor } from './component-definition.interface';
import { IDelayedChangesEntity } from './delayed-changes-definition.interface';
import { IMultiEntity } from './entity-definition.interface';
import { IFieldProps } from '../configurations-definitions.interface';
import { IconsEnum } from './icon-definition.interface';

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
    IFormatWrapper,
    IFullWrapper,
    IKeepChangesWrapper,
    ILabelWrapper,
    IMaskWrapper,                                                             /* @stable [09.04.2020] */
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
    IValidWrapper,                                                            /* @stable [17.04.2020] */
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
  ATTACH_FILE = 'paperclip',                                           /* https://fontawesome.com/ */
  CALENDAR = 'calendar-alt-regular',                                   /* https://fontawesome.com/ */
  CLOSE = 'times',                                                     /* https://fontawesome.com/ */
  DOWNLOAD = 'file-download',                                          /* https://fontawesome.com/ */
  DROP_DOWN = 'chevron-down',                                          /* https://fontawesome.com/ */
  VIDEO = 'video',                                                     /* https://fontawesome.com/ */
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
 * @stable [06.03.2020]
 */
export type DateFieldRangeValueT = DatesRangeValueT | DateTimeLikeTypeT;

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
 * @default-entity
 * @stable [15.01.2020]
 */
export const DEFAULT_QUICK_SEARCH_FIELD_ENTITY = Object.freeze<IBaseSelectProps>({
  allowEmptyFilterValue: false,
  anchored: true,
  expandActionRendered: false,
  preventFocus: false,
});

/**
 * @default-entity
 * @stable [16.04.2020]
 */
export const DEFAULT_NOT_CHANGEABLE_FIELD_ENTITY = Object.freeze<IGenericBaseFieldEntity>({
  readOnly: true,
  changeable: false,
});
