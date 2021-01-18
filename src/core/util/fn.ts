import { TypeUtils } from '../util';

/**
 * @stable [18.01.2021]
 * @param sourceFn
 * @param nextFn
 * @param nextFnScope
 */
const sequence = (sourceFn: (...args) => unknown,
                  nextFn: (...args) => unknown,
                  nextFnScope?: unknown): (...args) => unknown =>
  function () {
    if (TypeUtils.isFn(sourceFn)) {
      sourceFn.apply(this, arguments);
    }
    nextFn.apply(nextFnScope || this, arguments);
  };

/**
 * @stable [18.01.2021]
 */
const noop = () => {
  // Do nothing
};

/**
 * @stable [18.01.2021]
 */
const nullNoop = () => null;

/**
 * @stable [18.01.2021]
 */
export class FnUtils {
  public static readonly noop = noop;
  public static readonly nullNoop = nullNoop;
  public static readonly sequence = sequence;
}
