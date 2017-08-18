export type SequenceFunctionT = (...args) => any;

export function sequence(sourceFn: SequenceFunctionT, nextFn: SequenceFunctionT, nextFnScope?: any): SequenceFunctionT {
  return function () {
    sourceFn.apply(this, arguments);
    nextFn.apply(nextFnScope || this, arguments);
  };
}
