import JQuery from 'jquery';

/**
 * @stable [09.05.2018]
 */
export interface IJqInput extends JQuery<HTMLInputElement> {
  caret?(position?: number): number;
}

/**
 * @stable [09.05.2018]
 */
export interface IJqElement extends JQuery<HTMLElement> {
}

/**
 * @stable [09.05.2018]
 * @param {IJqInput} input
 * @param {number} position
 * @returns {number}
 */
export const caret = (input: IJqInput, position?: number): number => input.caret(position);
