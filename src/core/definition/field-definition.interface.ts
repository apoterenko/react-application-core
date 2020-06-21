import {
  InputHTMLAttributes,
  RefAttributes,
  TextareaHTMLAttributes,
} from 'react';

import {
  AnyT,
  EntityIdT,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  IBindDictionaryWrapper,
  ICaretBlinkingFrequencyWrapper,
  ICaretPositionWrapper,
  ICaretVisibilityWrapper,
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
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFormatWrapper,
  IFullWrapper,
  IKeepChangesWrapper,
  IKeyboardOpenWrapper,
  ILabelWrapper,
  IMaskWrapper,
  IMaxLengthWrapper,
  IMessageWrapper,
  IMinLengthWrapper,
  INameWrapper,
  IOnChangeWrapper,
  IOnClearWrapper,
  IOnClickWrapper,
  IOnDelayWrapper,
  IOnDictionaryEmptyWrapper,
  IOnDictionaryLoadWrapper,
  IOnFocusWrapper,
  IOnFormChangeWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPlainValueWrapper,
  IPrefixLabelWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  IStepWrapper,
  ITabIndexWrapper,
  ITitleWrapper,
  ITypeWrapper,
  IUseCursorWrapper,
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
import { IKeyboardConfigurationEntity } from './keyboard-definition.interface';
import { IFocusEvent } from './event-definition.interface';

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
  extends IKeyboardConfigurationEntity,                                           /* @stable [21.06.2020] */
    IAutoFocusWrapper,                                                            /* @stable [17.06.2020] */
    IBindDictionaryWrapper,
    ICaretBlinkingFrequencyWrapper,                                               /* @stable [21.06.2020] */
    IChangeableWrapper,                                                           /* @stable [20.06.2020] */
    IDefaultValueWrapper,                                                         /* @stable [20.06.2020] */
    IDelayTimeoutWrapper,
    IDisabledWrapper,
    IDisplayNameWrapper,
    IDisplayValueRenderedOnlyWrapper,
    IDisplayValueWrapper<string | ((value: AnyT) => string)>,
    IEmptyValueWrapper,
    IErrorMessageRenderedWrapper,                                                 /* @stable [18.06.2020] */
    IFieldRenderedWrapper,
    IFormatWrapper,
    IFullWrapper,
    IKeepChangesWrapper,
    ILabelWrapper,
    IMaskWrapper,
    IMaxLengthWrapper,                                                            /* @stable [20.06.2020] */
    IMessageWrapper,                                                              /* @stable [20.06.2020] */
    IMinLengthWrapper,                                                            /* @stable [20.06.2020] */
    INameWrapper,                                                                 /* @stable [21.06.2020] */
    IOnChangeWrapper,                                                             /* @stable [21.06.2020] */
    IOnClearWrapper,
    IOnClickWrapper,                                                              /* @stable [17.06.2020] */
    IOnDelayWrapper,
    IOnDictionaryEmptyWrapper<string, IApiEntity>,
    IOnDictionaryLoadWrapper<{}, string>,
    IOnFocusWrapper<IFocusEvent>,                                                 /* @stable [21.06.2020] */
    IOnFormChangeWrapper,
    IPatternWrapper,
    IPlaceholderWrapper,
    IPlainValueWrapper,                                                           /* @stable [21.06.2020] */
    IPrefixLabelWrapper,                                                          /* @stable [18.06.2020] */
    IPreventFocusWrapper,
    IPreventManualChangesWrapper,
    IReadOnlyWrapper,                                                             /* @stable [18.06.2020] */
    IRenderedWrapper,
    IRequiredWrapper,
    ITypeWrapper<StringNumberT>,
    IUseCursorWrapper,                                                            /* @stable [21.06.2020] */
    IUseKeyboardWrapper,                                                          /* @stable [20.06.2020] */
    IValidWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxFieldEntity
  extends IOriginalValueWrapper,
    IReduxLifeCycleEntity,
    IValueWrapper {
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
    IAutoCompleteWrapper,
    IStepWrapper,
    ITabIndexWrapper {
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
 * @stable [04.09.2018]
 */
export interface IFieldState
  extends IErrorWrapper<string>,
    IKeyboardOpenWrapper,
    ICaretVisibilityWrapper,
    ICaretPositionWrapper {
  focused?: boolean; // TODO
}

/**
 * @component
 * @stable [09.05.2020]
 */
export interface IField<TProps extends IFieldProps = IFieldProps,
  TState extends IFieldState = IFieldState>
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
 * @enum
 * @stable [17.06.2020]
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
  FIELD = 'rac-field',
  FIELD_ATTACHMENT = 'rac-field__attachment',
  FIELD_BUSY = 'rac-field-busy',
  FIELD_CHANGEABLE = 'rac-field-changeable',
  FIELD_DISABLED = 'rac-field-disabled',
  FIELD_ERROR_MESSAGE = 'rac-field__error-message',
  FIELD_INPUT_LABEL = 'rac-field__input-label',
  FIELD_INPUT_MIRROR = 'rac-field__input-mirror',
  FIELD_INPUT_WRAPPER = 'rac-field__input-wrapper',
  FIELD_INVALID = 'rac-field-invalid',
  FIELD_LABEL = 'rac-field__label',
  FIELD_LABELED = 'rac-field-labeled',
  FIELD_MESSAGE = 'rac-field__message',
  FIELD_NOT_CHANGEABLE = 'rac-field-not-changeable',
  FIELD_PREFIX_LABEL = 'rac-field__prefix-label',
  FIELD_REQUIRED = 'rac-field-required',
  FIELD_SELF = 'rac-field__self',
  FIELD_VALUE_NOT_PRESENT = 'rac-field-value-not-present',
  FIELD_VALUE_PRESENT = 'rac-field-value-present',
}
