/**
 * @stable [01.10.2019]
 */
export interface IBootstrapper {
  init(callback?: () => void): void;
}
