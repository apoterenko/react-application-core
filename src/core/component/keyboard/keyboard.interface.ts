import {
  IPositionWrapper,
  IUseUppercaseWrapper,
  IOnChangeWrapper,
  IModeWrapper,
} from '../../definitions.interface';
import {
  IKeyboardConfiguration,
  KeyboardKeyEnum,
  KeyboardLayoutT,
  IKeyboardKey,
} from '../../configurations-definitions.interface';

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

/**
 * @stable [13.01.2019]
 */
export const KEYBOARD_BASIC_NUMERIC_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}]
];

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
