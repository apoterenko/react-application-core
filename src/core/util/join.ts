import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { isArrayNotEmpty } from './array';
import { nvl } from './nvl';

/**
 * @stable [30.05.2019]
 * @param {AnyT[]} parts
 * @param {string} joiner
 * @returns {string}
 */
export const join = (parts: AnyT[], joiner: string = '\u0020'): string =>
  parts.filter((v) => !R.isNil(v)).join(joiner);

/**
 * @stable [30.08.2019]
 * @param {string} parts
 * @returns {string}
 */
export const joinClassName = (...parts: string[]): string => join(parts, ' ');

/**
 *
 * @param {AnyT[]} parts
 * @returns {string}
 */
export const joinReduce = (parts: AnyT[]): string => isArrayNotEmpty(parts)
  ? (
    parts.length > 1
      ? `${parts[0]}, ...`
      : nvl(parts[0], '')
  )
  : '';
