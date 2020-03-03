import * as R from 'ramda';

import {
  IFormWrapper,
  ITokenWrapper,
  UNDEF,
} from '../definitions.interface';

/**
 * @stable [29.02.2020]
 * @param {IFormWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectForm = <TValue>(wrapper: IFormWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.form;

/**
 * @stable [29.02.2020]
 * @param {ITokenWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectToken = <TValue = string>(wrapper: ITokenWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.token;
