import { IJQueryInputElement } from '../definitions.interface';

/**
 * @stable [07.01.2018]
 * @param {IJQueryInputElement} input
 * @param {number} position
 * @returns {number}
 */
export const caret = (input: IJQueryInputElement, position?: number): number => input.caret(position);
