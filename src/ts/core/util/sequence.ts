export type SequenceFunctionT = (...args) => any;

export function sequence(sourceFn: SequenceFunctionT, nextFn: SequenceFunctionT, scope?: any): SequenceFunctionT {
  return function () {
    sourceFn.apply(scope || this, arguments);
    nextFn.apply(scope || this, arguments);
  };
}
