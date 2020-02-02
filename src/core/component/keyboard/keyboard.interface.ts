import {
  IPositionWrapper,
  IUseUppercaseWrapper,
  IModeWrapper,
} from '../../definitions.interface';
import {
  KeyboardKeyDescriptorsEnum,
  KeyboardKeysEnum,
  KeyboardLayoutT,
} from '../../definition';

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_QWERTY_LAYOUT: KeyboardLayoutT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [{value: KeyboardKeyDescriptorsEnum.UPPERCASE, type: KeyboardKeysEnum.UPPERCASE},
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    {value: KeyboardKeyDescriptorsEnum.BACK, type: KeyboardKeysEnum.BACKSPACE}],
  [
    {value: KeyboardKeyDescriptorsEnum.DIGITAL, type: KeyboardKeysEnum.CHANGE_LAYOUT},
    ',',
    {value: KeyboardKeyDescriptorsEnum.SPACE, type: KeyboardKeysEnum.SPACE, width: 200},
    '.', {value: KeyboardKeyDescriptorsEnum.CLOSE, type: KeyboardKeysEnum.CLOSE}
  ]
];

/**
 * @stable [08.05.2018]
 */
export const KEYBOARD_QWERTY_DIGITAL_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['!', '@', '#', '$', '%', '&', '+', '?', '/'],
  ['*', '_', '"', '\'', '(', ')', '-', ':', {value: KeyboardKeyDescriptorsEnum.BACK, type: KeyboardKeysEnum.BACKSPACE}],
  [{value: KeyboardKeyDescriptorsEnum.LITERAL, type: KeyboardKeysEnum.CHANGE_LAYOUT},
    ';', ',', {value: KeyboardKeyDescriptorsEnum.SPACE, type: KeyboardKeysEnum.SPACE, width: 200}, '.', '=',
    {value: KeyboardKeyDescriptorsEnum.CLOSE, type: KeyboardKeysEnum.CLOSE}]
];

/**
 * @stable [19.02.2019]
 */
export const INLINE_KEYBOARD_NUMERIC_LAYOUT: KeyboardLayoutT = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', {value: KeyboardKeyDescriptorsEnum.BACK, type: KeyboardKeysEnum.BACKSPACE}]
];

/**
 * @stable [19.02.2019]
 */
export const KEYBOARD_NUMERIC_LAYOUT: KeyboardLayoutT = INLINE_KEYBOARD_NUMERIC_LAYOUT.concat([
  [{value: KeyboardKeyDescriptorsEnum.CLOSE, type: KeyboardKeysEnum.CLOSE}]
]);

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardState extends IPositionWrapper,
                                        IModeWrapper<number>,
                                        IUseUppercaseWrapper {
}
