export function sequence(sourceFn: Function, nextFn: Function, scope?: any): Function {
  return function () {
    sourceFn.apply(scope || this, arguments);
    nextFn.apply(scope || this, arguments);
  };
}
