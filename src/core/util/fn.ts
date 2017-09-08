import { AnyT } from 'core/definition.interface';

export type FunctionT = (...args) => AnyT;

export function sequence(sourceFn: FunctionT, nextFn: FunctionT, nextFnScope?: AnyT): FunctionT {
  return function() {
    sourceFn.apply(this, arguments);
    nextFn.apply(nextFnScope || this, arguments);
  };
}

export function and(sourceFn: FunctionT, nextFn: FunctionT, nextFnScope?: AnyT): FunctionT {
  return function() {
    return sourceFn.apply(this, arguments) && nextFn.apply(nextFnScope || this, arguments);
  };
}

/* tslint:disable */
export function noop(): void {
}
