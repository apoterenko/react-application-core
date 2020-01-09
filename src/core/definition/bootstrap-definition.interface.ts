import { IAsyncLibConfigEntity } from '../definition';

/**
 * @stable [01.10.2019]
 */
export interface IBootstrapper {
  init(callback?: () => void): void;
  registerAsyncLibrary(cfg: IAsyncLibConfigEntity): IBootstrapper;
}
