import { injectable } from 'inversify';

import { IFullScreenManager } from './full-screen.interface';

@injectable()
export class FullScreenDisabledManager implements IFullScreenManager {

  /**
   * @stable [04.04.2019]
   */
  public enable(): void {
    //  Do nothing
  }

  /**
   * @stable [04.04.2019]
   */
  public disable(): void {
    //  Do nothing
  }
}
