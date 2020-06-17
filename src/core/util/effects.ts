/**
 * @stable [16.06.2020]
 * @param {(...args) => void} effects
 * @returns {(...args) => void}
 */
export const effectsBy = (...effects: Array<((...args) => void)>): (...args) => void =>
  (): void => effects.forEach((effect) => effect());
