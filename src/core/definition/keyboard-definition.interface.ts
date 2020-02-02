import {
  IClassNameWrapper,
  IDisabledWrapper,
  IFieldWrapper,
  IInlineWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardKeyConfigurationWrapper,
  ILayoutWrapper,
  IOnChangeWrapper,
  IOnCloseWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  IRippledWrapper,
  ITypeWrapper,
  IUseUppercaseWrapper,
  IValueWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IField } from '../component/field/field/field.interface'; // TODO
import { IComponentProps } from './props-definition.interface';

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

// TODO
export interface IKeyboardKeyProps
  extends IComponentProps,
  IDisabledWrapper,
  IOnSelectWrapper<KeyboardKeyValueT>,
  IRendererWrapper<string>,
  IRippledWrapper,   // TODO Button props
  IUseUppercaseWrapper,
  IValueWrapper<KeyboardKeyValueT> {
}

// TODO
export interface IKeyboardProps
  extends IComponentProps,
    IKeyboardKeyConfigurationEntity,
    IOnChangeWrapper<string>,
    IFieldWrapper<IField>,
    ILayoutWrapper<KeyboardLayoutT[]>,
    IOnCloseWrapper,
    IInlineWrapper {
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
