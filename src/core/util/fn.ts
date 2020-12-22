import { AnyT } from '../definitions.interface';
import { isFn } from '../util';

/**
 * @stable [09.10.2019]
 * @param {(...args) => AnyT} sourceFn
 * @param {(...args) => AnyT} nextFn
 * @param {AnyT} nextFnScope
 * @returns {(...args) => AnyT}
 */
export const sequence = (sourceFn: (...args) => AnyT,
                         nextFn: (...args) => AnyT,
                         nextFnScope?: AnyT): (...args) => AnyT =>
  function() {
    if (isFn(sourceFn)) {
      sourceFn.apply(this, arguments);
    }
    nextFn.apply(nextFnScope || this, arguments);
  };

/* tslint:disable */
export function noop(): void {
}

/**
 * @stable [21.12.2020]
 */
export class FnUtils {
  public static readonly noop = noop;
}
