import {
  IPositionWrapper,
  IFieldWrapper,
  IUseUppercaseWrapper,
  IOnChangeWrapper,
  IOnCloseWrapper,
  ITypeWrapper,
  IValueWrapper,
  IWidthWrapper,
  IClassNameWrapper,
  ILayoutWrapper,
  IModeWrapper,
} from '../../definitions.interface';
import { IComponentConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [08.05.2018]
 */
export enum KeyboardKeyEnum {
  UPPERCASE,
  CHANGE_LAYOUT,
  LOWERCASE,
  BACKSPACE,
  SPACE,
  ENTER,
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKey extends IValueWrapper<string>,
                                      ITypeWrapper<KeyboardKeyEnum>,
                                      IClassNameWrapper,
                                      IWidthWrapper {
}

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_SPECIAL_KEYS = {
  UPPERCASE: '↑',
  LOWERCASE: '↓',
  BACK: '‹',
  SPACE: ' ',
  DIGITAL: '123',
  LITERAL: 'ABC',
};

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_QWERTY_LAYOUT: KeyboardLayoutT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [{value: KEYBOARD_SPECIAL_KEYS.UPPERCASE, type: KeyboardKeyEnum.UPPERCASE},
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}],
  [
    {value: KEYBOARD_SPECIAL_KEYS.DIGITAL, type: KeyboardKeyEnum.CHANGE_LAYOUT, className: 'rac-keyboard-digital'},
    ',',
    {value: KEYBOARD_SPECIAL_KEYS.SPACE, type: KeyboardKeyEnum.SPACE, width: 200},
    '.'
  ]
];

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_QWERTY_DIGITAL_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['!', '@', '#', '$', '%', '&', '+', '?', '/'],
  ['*', '_', '"', '\'', '(', ')', '-', ':', {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}],
  [{value: KEYBOARD_SPECIAL_KEYS.LITERAL, type: KeyboardKeyEnum.CHANGE_LAYOUT, className: 'rac-keyboard-digital'},
    ';', ',', {value: KEYBOARD_SPECIAL_KEYS.SPACE, type: KeyboardKeyEnum.SPACE, width: 200}, '.', '=']
];

/**
 * @stable [21.11.2018]
 */
export const KEYBOARD_NUMERIC_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '0'],
  ['+', '-', ',', '.', {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}]
];

export type KeyboardKeyT = string | IKeyboardKey;
export type KeyboardLayoutT = KeyboardKeyT[][];

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardConfiguration extends IComponentConfiguration,
                                                IFieldWrapper<HTMLInputElement | HTMLTextAreaElement>,
                                                ILayoutWrapper<KeyboardLayoutT[]>,
                                                IOnCloseWrapper {
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardEntity extends IOnChangeWrapper<string> {
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardProps extends IKeyboardEntity,
                                        IKeyboardConfiguration {
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardState extends IPositionWrapper,
                                        IModeWrapper<number>,
                                        IUseUppercaseWrapper {
}
