import { injectable } from 'inversify';

import { DI_TYPES, lazyInject } from '../../di';
import { IFullScreenManager } from './full-screen.interface';
import { IDomAccessor } from '../../definition';

@injectable()
export class FullScreenManager implements IFullScreenManager {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  /**
   * @stable [04.04.2019]
   */
  public enable(): void {
    this.domAccessor.enableFullScreen();
  }

  /**
   * @stable [04.04.2019]
   */
  public disable(): void {
    this.domAccessor.disableFullScreen();
  }
}
