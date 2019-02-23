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
} from '../../configurations-definitions.interface';

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_SPECIAL_KEYS = {
  UPPERCASE: '↑',
  LOWERCASE: '↓',
  BACK: '‹',
  CLOSE: '×',
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
    {value: KEYBOARD_SPECIAL_KEYS.DIGITAL, type: KeyboardKeyEnum.CHANGE_LAYOUT},
    ',',
    {value: KEYBOARD_SPECIAL_KEYS.SPACE, type: KeyboardKeyEnum.SPACE, width: 200},
    '.', {value: KEYBOARD_SPECIAL_KEYS.CLOSE, type: KeyboardKeyEnum.CLOSE}
  ]
];

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_QWERTY_DIGITAL_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['!', '@', '#', '$', '%', '&', '+', '?', '/'],
  ['*', '_', '"', '\'', '(', ')', '-', ':', {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}],
  [{value: KEYBOARD_SPECIAL_KEYS.LITERAL, type: KeyboardKeyEnum.CHANGE_LAYOUT},
    ';', ',', {value: KEYBOARD_SPECIAL_KEYS.SPACE, type: KeyboardKeyEnum.SPACE, width: 200}, '.', '=',
    {value: KEYBOARD_SPECIAL_KEYS.CLOSE, type: KeyboardKeyEnum.CLOSE}]
];

/**
 * @stable [19.02.2019]
 */
export const INLINE_KEYBOARD_NUMERIC_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', {value: KEYBOARD_SPECIAL_KEYS.BACK, type: KeyboardKeyEnum.BACKSPACE}]
];

/**
 * @stable [19.02.2019]
 */
export const KEYBOARD_NUMERIC_LAYOUT: KeyboardLayoutT = INLINE_KEYBOARD_NUMERIC_LAYOUT.concat([
  [{value: KEYBOARD_SPECIAL_KEYS.CLOSE, type: KeyboardKeyEnum.CLOSE}]
]);

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
