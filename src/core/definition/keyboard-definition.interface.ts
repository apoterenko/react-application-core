import {
  IClassNameWrapper,
  IFieldWrapper,
  IInlineWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardKeyConfigurationWrapper,
  ILayoutWrapper,
  IOnChangeWrapper,
  IOnCloseWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  ITypeWrapper,
  IUseUppercaseWrapper,
  IValueWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IField } from './field-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericBaseButtonEntity } from './button-definition.interface';

/**
 * @stable [02.02.2020]
 */
export enum KeyboardKeyDescriptorsEnum {
  BACK = '‹',
  CLOSE = '×',
  DIGITAL = '123',
  LITERAL = 'ABC',
  LOWERCASE = '↓',
  SPACE = ' ',
  UPPERCASE = '↑',
}

/**
 * @stable [02.02.2020]
 */
export enum KeyboardKeysEnum {
  BACKSPACE,
  CHANGE_LAYOUT,
  CLOSE,
  ENTER,
  LOWERCASE,
  SPACE,
  UPPERCASE,
}

/**
 * @stable [02.02.2020]
 */
export type KeyboardKeyValueT = string | IKeyboardKeyValueEntity;
export type KeyboardLayoutT = KeyboardKeyValueT[][];

/**
 * @class-names
 * @stable [01.02.2020]
 */
export enum KeyboardClassNamesEnum {
  KEYBOARD = 'rac-keyboard',
}

/**
 * @stable [02.02.2020]
 */
export interface IKeyboardKeyValueEntity
  extends IClassNameWrapper,
    IRendererWrapper,
    ITypeWrapper<KeyboardKeysEnum>,
    IValueWrapper,
    IWidthWrapper {
}

/**
 * @behavioral-entity
 * @stable [26.01.2020]
 */
export interface IBehavioralKeyboardKeyEntity
  extends IOnSelectWrapper<KeyboardKeyValueT>,
    IRendererWrapper<string> {
}

/**
 * @generic-entity
 * @stable [02.02.2020]
 */
export interface IGenericKeyboardKeyEntity
  extends IUseUppercaseWrapper,
    IValueWrapper<KeyboardKeyValueT> {
}

/**
 * @props
 * @stable [02.02.2020]
 */
export interface IKeyboardKeyProps
  extends IGenericComponentProps,
    IBehavioralKeyboardKeyEntity,
    IGenericBaseButtonEntity,
    IGenericKeyboardKeyEntity {
}

/**
 * @generic-entity
 * @stable [02.02.2020]
 */
export interface IGenericKeyboardEntity
  extends IFieldWrapper<IField>,
    IInlineWrapper,
    IKeyboardKeyConfigurationEntity,
    ILayoutWrapper<KeyboardLayoutT[]> {
}

/**
 * @behavioral-entity
 * @stable [02.02.2020]
 */
export interface IBehavioralKeyboardEntity
  extends IOnChangeWrapper<string>,
    IOnCloseWrapper {
}

/**
 * @props
 * @stable [02.02.2020]
 */
export interface IKeyboardProps
  extends IGenericComponentProps,
    IGenericKeyboardEntity,
    IBehavioralKeyboardEntity {
}

/**
 * @configuration-entity
 * @stable [01.02.2020]
 */
export interface IKeyboardConfigurationEntity
  extends IKeyboardConfigurationWrapper<IKeyboardProps> {
}

/**
 * @configuration-entity
 * @stable [01.02.2020]
 */
export interface IKeyboardKeyConfigurationEntity
  extends IKeyboardKeyConfigurationWrapper<IKeyboardKeyProps> {
}
