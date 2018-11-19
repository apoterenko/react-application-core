import * as R from 'ramda';

/**
 * @stable [19.11.2018]
 * @param {number} length
 * @returns {any}
 */
export const generateArray = (length: number) => Array.apply(null, {length});

/**
 * @stable [19.11.2018]
 * @param {number[]} array
 * @returns {number}
 */
export const arrayMinValue = (array: number[]): number => R.reduce(R.min, Infinity, array) as number;
