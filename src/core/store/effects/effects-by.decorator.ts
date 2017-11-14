export function effectsBy(fn: (...args) => void): (...args) => void {
  return (): void => fn();
}
