import JQuery from 'jquery';

/**
 * @stable [09.05.2018]
 */
export interface IJqField extends JQuery<HTMLInputElement> {
  caret?(position?: number): number;
}

/**
 * @stable [09.05.2018]
 */
export interface IJqElement extends JQuery<HTMLElement> {
}

/**
 * @stable [09.05.2018]
 * @param {IJqField} field
 * @param {number} position
 * @returns {number}
 */
export const caret = (field: IJqField, position?: number): number => field.caret(position);
