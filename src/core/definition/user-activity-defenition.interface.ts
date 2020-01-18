import {
  ICallbackWrapper,
  ITimeoutWrapper,
} from '../definitions.interface';

/**
 * @stable [19.01.2020]
 */
export interface IUserActivityManager {
  cancel(): void;
  resume(): void;
  spy(cfg: IUserActivityConfigEntity): void;
  suspend(): void;
}

/**
 * @stable [19.01.2020]
 */
export interface IUserActivityConfigEntity
  extends ICallbackWrapper,
    ITimeoutWrapper {
}
