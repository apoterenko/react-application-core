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
  IBindDictionaryWrapper,
  IChangeableWrapper,
  IClassNameWrapper,
  IDefaultValueWrapper,
  IDelayTimeoutWrapper,
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
  IMaskGuideWrapper,
  IMaskWrapper,
  IMenuRenderedWrapper,
  INameWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOnDelayWrapper,
  IOnDictionaryEmptyWrapper,
  IOnDictionaryLoadWrapper,
  IOnFormChangeWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPlainValueWrapper,
  IPrefixLabelWrapper,
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
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import {
  DatesRangeValueT,
  DateTimeLikeTypeT,
} from './date-definition.interface';
import { IComponentCtor } from './component-definition.interface';
import {
  IReduxLifeCycleEntity,
  IReduxMultiEntity,
} from './entity-definition.interface';
import { IFieldProps2 } from '../configurations-definitions.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IApiEntity } from './api-definition.interface';
import { IPresetsBaseSelectEntity } from './select-definition.interface';

/**
 * @stable [16.05.2020]
 */
export class FieldConstants {
  public static readonly DISPLAY_EMPTY_VALUE = '';                                                    /* @stable [16.05.2020] */
  public static readonly ENTITY_ID_FIELD_NAME = 'entityId';                                           /* @stable [16.05.2020] */
  public static readonly ID_FIELD_NAME = 'id';                                                        /* @stable [16.05.2020] */
  public static readonly VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;                                        /* @stable [16.05.2020] */
  public static readonly VALUE_TO_RESET = null;                                                       /* @stable [16.05.2020] */
}

/**
 * @presets-entity
 * @stable [09.05.2020]
 */
export interface IPresetsFieldEntity
  extends IActionsWrapper<IFieldActionEntity[]>,
    IAutoFocusWrapper,
    IBindDictionaryWrapper,
    IChangeableWrapper,
    IDefaultValueWrapper,
    IDelayTimeoutWrapper,
    IDisplayNameWrapper,
    IDisplayValueWrapper<string | ((value: AnyT) => string)>,
    IEmptyValueWrapper,
    IFieldRenderedWrapper,
    IFormatWrapper,
    IFullWrapper,
    IKeepChangesWrapper,
    ILabelWrapper,
    IMaskWrapper,
    INameWrapper,
    IOnChangeWrapper,
    IOnDelayWrapper,
    IOnDictionaryEmptyWrapper<string, IApiEntity>,
    IOnDictionaryLoadWrapper<{}, string>,
    IOnFormChangeWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IPlainValueWrapper,
    IPrefixLabelWrapper,
    IPreventFocusWrapper,
    IPreventManualChangesWrapper,
    IReadOnlyWrapper,
    IRenderedWrapper,
    IRequiredWrapper,
    ITypeWrapper<StringNumberT> {
}

/**
 * @presets-entity
 * @stable [19.05.2020]
 */
export interface IPresetsBaseTextFieldEntity
  extends IPresetsFieldEntity,
    IMaskGuideWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxFieldEntity
  extends IReduxLifeCycleEntity,
    IOriginalValueWrapper,
    IValueWrapper {
}

/**
 * @redux-entity
 * @stable [19.05.2020]
 */
export interface IReduxBaseTextFieldEntity
  extends IReduxFieldEntity {
}

/**
 * @generic-entity
 * @stable [09.05.2020]
 */
export interface IGenericFieldEntity
  extends IPresetsFieldEntity,
    IReduxFieldEntity {
}

export interface IGenericFieldEntity2
  extends IGenericFieldEntity,
    IActionsPosition<FieldActionPositionsEnum>,
    IAutoCompleteWrapper,
    IDisabledWrapper,
    IDisplayValueRenderedOnlyWrapper,
    IStepWrapper,
    ISyntheticCursorWrapper,
    ITabIndexWrapper,
    IUseKeyboardWrapper,
    IValidWrapper {
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
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxFieldsChangesEntity
  extends IFieldsWrapper {
}

/**
 * @props
 * @stable [09.05.2020]
 */
export interface IFieldProps
  extends IGenericComponentProps,
    IGenericFieldEntity {
}

/**
 * @component
 * @stable [09.05.2020]
 */
export interface IField<TProps extends IFieldProps = IFieldProps,
  TState = {}>
  extends IGenericComponent<TProps, TState>,
    IOnChangeWrapper,
    IValueWrapper {
}

/**
 * @stable [02.10.2019]
 */
export type MultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | IReduxMultiEntity;
export type MultiFieldSingleValueT = IReduxMultiEntity | EntityIdT;
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
 * @entity
 * @stable [06.05.2020]
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
 * @stable [18.05.2020]
 */
export interface IFieldInputAttributes
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
}

/**
 * @stable [18.05.2020]
 */
export interface IFieldTextAreaAttributes
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    RefAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [18.05.2020]
 */
export type FieldComposedInputAttributesT = IFieldInputAttributes | IFieldTextAreaAttributes;

/**
 * @stable [30.10.2019]
 */
export enum FieldActionPositionsEnum {
  LEFT,
  RIGHT,
}

export interface IFieldsPresets {
  [fieldName: string]: string | IFieldProps2 | ((field) => IFieldProps2 | string);
}

/**
 * @default-entity
 * @stable [24.11.2019]
 */
export const DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY = Object.freeze<IGenericFieldEntity2>({
  autoComplete: 'new-password',
});

/**
 * @default-entity
 * @stable [24.11.2019]
 */
export const DEFAULT_PASSWORD_FIELD_ENTITY = Object.freeze<IGenericFieldEntity2>({
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
 * @stable [19.05.2020]
 */
export const DEFAULT_QUICK_SEARCH_FIELD_ENTITY = Object.freeze<IPresetsBaseSelectEntity>({
  allowEmptyFilterValue: false,                                                             /* @stable [17.05.2020] */
  anchored: true,                                                                           /* @stable [17.05.2020] */
  expandActionRendered: false,                                                              /* @stable [17.05.2020] */
  preventFocus: false,                                                                      /* @stable [17.05.2020] */
});

/**
 * @default-entity
 * @stable [01.06.2020]
 */
export const DEFAULT_NOT_CHANGEABLE_FIELD_ENTITY = Object.freeze<IPresetsFieldEntity>({
  changeable: false,
  readOnly: true,
});

/**
 * @classes
 * @stable [26.03.2020]
 */
export enum FieldClassesEnum {
  FIELD_CHIPS = 'rac-field__chips',
  FIELD_INPUT_WRAPPER = 'rac-field__input-wrapper',
  FIELD_SELF = 'rac-field__self',
}
