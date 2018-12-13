import { AnyT } from '../definitions.interface';
import { isFn } from '../util';

export type FunctionT = (...args) => AnyT;

export function sequence(sourceFn: FunctionT, nextFn: FunctionT, nextFnScope?: AnyT): FunctionT {
  const isSourceFnExist = isFn(sourceFn);
  return function() {
    if (isSourceFnExist) {
      sourceFn.apply(this, arguments);
    }
    nextFn.apply(nextFnScope || this, arguments);
  };
}

/* tslint:disable */
export function noop(): void {
}
