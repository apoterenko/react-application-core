export function effectsBy(...fns: Array<((...args) => void)>): (...args) => void {
  return (): void => fns.forEach((fn) => fn());
}
