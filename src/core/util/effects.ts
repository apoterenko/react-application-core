/**
 * @stable [16.12.2020]
 * @param effects
 */
export const effectsBy = (...effects: ((...args) => void)[]): (...args) => void =>
  (): void => effects.forEach((effect) => effect());

/**
 * @stable [16.12.2020]
 */
export class EffectsUtils {
  public static readonly effectsBy = effectsBy;
}
