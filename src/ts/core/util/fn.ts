import { AnyT } from 'core/definition.interface';

export const emptyFn = () => {};
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

export function replace(sourceScope: AnyT, sourceFn: FunctionT, targetFn: FunctionT): FunctionT {
  const currentFn = sourceScope[sourceFn.name];
  sourceScope[sourceFn.name] = emptyFn;
  targetFn.call(sourceScope);
  sourceScope[sourceFn.name] = currentFn;
  return sourceFn;
}
