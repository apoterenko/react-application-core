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
  ICaretBlinkingFrequencyWrapper,
  ICaretPositionWrapper,
  ICaretVisibilityWrapper,
  IChangeableWrapper,
  IClassNameWrapper,
  IDefaultValueWrapper,
  IDelayTimeoutWrapper,
  IDisabledWrapper,
  IDisableLabelWrapper,
  IDisplayMessageWrapper,
  IDisplayNameWrapper,
  IDisplayValueRenderedOnlyWrapper,
  IDisplayValueWrapper,
  IEmptyValueWrapper,
  IEntity,
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IFieldRenderedWrapper,
  IFieldsWrapper,
  IFocusedWrapper,
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
  IOnBlurWrapper,
  IOnChangeManuallyWrapper,
  IOnChangeWrapper,
  IOnClearWrapper,
  IOnClickWrapper,
  IOnDelayWrapper,
  IOnDictionaryLoadWrapper,
  IOnFocusWrapper,
  IOnFormChangeWrapper,
  IOnKeyEnterWrapper,
  IOriginalValueWrapper,
  IPatternWrapper,
  IPlaceholderWrapper,
  IPlainValueWrapper,
  IPosUseKeyboardOnMobilePlatformOnlyWrapper,
  IPrefixLabelWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
  IRawDataWrapper,
  IReadOnlyWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  ITabIndexWrapper,
  ITitleWrapper,
  ITypeWrapper,
  IUseCursorWrapper,
  IUseKeyboardWrapper,
  IValidWrapper,
  IValueWrapper,
  UNDEF,
} from '../definitions.interface';
import {
  DatesRangeValueT,
  DateTimeLikeTypeT,
} from './date-definition.interface';
import { IComponentCtor } from './component-definition.interface';
import {
  IReduxLifeCycleEntity,
} from './entity-definition.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IKeyboardConfigurationEntity } from './keyboard-definition.interface';
import {
  IBaseEvent,
  IFocusEvent,
} from './event-definition.interface';
import { IReduxMultiEntity } from './multi-entity-definition.interface';

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
    IAutoCompleteWrapper,                                                         /* @stable [11.08.2020] */
    IAutoFocusWrapper,                                                            /* @stable [17.06.2020] */
    ICaretBlinkingFrequencyWrapper,                                               /* @stable [14.10.2020] */
    IChangeableWrapper,                                                           /* @stable [20.06.2020] */
    IDefaultValueWrapper,                                                         /* @stable [20.06.2020] */
    IDelayTimeoutWrapper,
    IDisabledWrapper,                                                             /* @stable [14.10.2020] */
    IDisplayMessageWrapper,                                                       /* @stable [14.10.2020] */
    IDisplayNameWrapper,
    IDisplayValueRenderedOnlyWrapper,
    IDisplayValueWrapper<string | ((value: AnyT) => string)>,                     /* @stable [22.06.2020] */
    IEmptyValueWrapper,
    IErrorMessageRenderedWrapper,                                                 /* @stable [18.06.2020] */
    IFieldRenderedWrapper,
    IFormatWrapper,
    IFullWrapper,
    IKeepChangesWrapper,
    ILabelWrapper,
    IMaskWrapper,                                                                 /* @stable [22.06.2020] */
    IMaxLengthWrapper,                                                            /* @stable [20.06.2020] */
    IMessageWrapper,                                                              /* @stable [20.06.2020] */
    IMinLengthWrapper,                                                            /* @stable [20.06.2020] */
    INameWrapper,                                                                 /* @stable [21.06.2020] */
    IOnBlurWrapper<IFocusEvent>,                                                  /* @stable [21.06.2020] */
    IOnChangeWrapper,                                                             /* @stable [21.06.2020] */
    IOnClearWrapper,
    IOnClickWrapper,                                                              /* @stable [17.06.2020] */
    IOnDelayWrapper,
    IOnDictionaryLoadWrapper<{}, string>,
    IOnFocusWrapper<IFocusEvent>,                                                 /* @stable [21.06.2020] */
    IOnFormChangeWrapper,
    IOnKeyEnterWrapper,                                                           /* @stable [14.10.2020] */
    IPatternWrapper,
    IPlaceholderWrapper,
    IPlainValueWrapper,                                                           /* @stable [21.06.2020] */
    IPosUseKeyboardOnMobilePlatformOnlyWrapper,                                   /* @stable [07.10.2020] */
    IPrefixLabelWrapper,                                                          /* @stable [18.06.2020] */
    IPreventFocusWrapper,
    IPreventManualChangesWrapper,                                                 /* @stable [14.10.2020] */
    IReadOnlyWrapper,                                                             /* @stable [18.06.2020] */
    IRenderedWrapper,
    IRequiredWrapper,
    ITabIndexWrapper,                                                             /* @stable [14.10.2020] */
    ITypeWrapper,
    IUseCursorWrapper,                                                            /* @stable [21.06.2020] */
    IUseKeyboardWrapper,                                                          /* @stable [20.06.2020] */
    IValidWrapper {
  onKeyArrowDown?(event: IBaseEvent): void;
  onKeyArrowUp?(event: IBaseEvent): void;
  onKeyBackspace?(event: IBaseEvent): void;
  onKeyDown?(event: IBaseEvent): void;
  onKeyEscape?(event: IBaseEvent): void;
  onKeyTab?(event: IBaseEvent): void;
  onKeyUp?(event: IBaseEvent): void;
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
 * @state
 * @stable [22.06.2020]
 */
export interface IFieldState
  extends ICaretPositionWrapper,
    ICaretVisibilityWrapper,
    IErrorWrapper<string>,
    IFocusedWrapper,
    IKeyboardOpenWrapper {
}

/**
 * @component
 * @stable [14.10.2020]
 */
export interface IUniversalField
  extends IOnChangeManuallyWrapper,
    IValueWrapper {
}

/**
 * @component
 * @stable [09.05.2020]
 */
export interface IField<TProps extends IFieldProps = IFieldProps,
  TState extends IFieldState = IFieldState>
  extends IGenericComponent<TProps, TState>,
    IUniversalField,
    IOnChangeWrapper,
    IOnKeyEnterWrapper {
}

/**
 * @stable [29.08.2020]
 */
export type MultiFieldValueT<TEntity extends IEntity = IEntity> = TEntity[] | IReduxMultiEntity;
export type MultiFieldSingleValueT = IReduxMultiEntity | EntityIdT;
export type NotMultiFieldValueT<TEntity extends IEntity = IEntity> = TEntity[] | EntityIdT;
export type MultiFieldValueOrEntityIdT = MultiFieldValueT | EntityIdT;
export type MultiFieldValueOrEntitiesIdsT<TEntity extends IEntity = IEntity> = MultiFieldValueT<TEntity> | EntityIdT[];

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
 * @props
 * @stable [18.05.2020]
 */
export interface IFieldInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
}

/**
 * @props
 * @stable [14.10.2020]
 */
export interface IFieldTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    RefAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [18.05.2020]
 */
export type FieldComposedInputAttributesT = IFieldInputProps | IFieldTextAreaProps;

/**
 * @enum
 * @stable [17.06.2020]
 */
export enum FieldActionPositionsEnum {
  LEFT,
  RIGHT,
}

export interface IFieldsPresets {
  [fieldName: string]: string | IPresetsFieldEntity | ((field) => IPresetsFieldEntity | string);
}

/**
 * @default-entity
 * @stable [19.08.2020]
 */
export const DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY = Object.freeze<IPresetsFieldEntity>({
  autoComplete: 'new-password',
});

/**
 * @default-entity
 * @stable [19.08.2020]
 */
export const DEFAULT_PASSWORD_FIELD_ENTITY = Object.freeze<IGenericFieldEntity>({
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
 * @stable [01.06.2020]
 */
export const DEFAULT_NOT_CHANGEABLE_FIELD_ENTITY = Object.freeze<IPresetsFieldEntity>({
  changeable: false,
  readOnly: true,
});

/**
 * @default-entity
 * @stable [27.09.2020]
 */
export const DEFAULT_CHANGEABLE_FIELD_ENTITY = Object.freeze<IPresetsFieldEntity>({
  changeable: true,
  readOnly: false,
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
  FIELD_FOCUSED = 'rac-field-focused',
  FIELD_INPUT_CARET = 'rac-field__input-caret',
  FIELD_INPUT_LABEL = 'rac-field__input-label',
  FIELD_INPUT_MIRROR = 'rac-field__input-mirror',
  FIELD_INPUT_WRAPPER = 'rac-field__input-wrapper',
  FIELD_INVALID = 'rac-field-invalid',
  FIELD_LABEL = 'rac-field__label',
  FIELD_LABELED = 'rac-field-labeled',
  FIELD_MESSAGE = 'rac-field__message',
  FIELD_NOT_CHANGEABLE = 'rac-field-not-changeable',
  FIELD_NOT_FOCUSED = 'rac-field-not-focused',
  FIELD_PREFIX_LABEL = 'rac-field__prefix-label',
  FIELD_REQUIRED = 'rac-field-required',
  FIELD_SELF = 'rac-field__self',
  FIELD_VALUE_NOT_PRESENT = 'rac-field-value-not-present',
  FIELD_VALUE_PRESENT = 'rac-field-value-present',
}
