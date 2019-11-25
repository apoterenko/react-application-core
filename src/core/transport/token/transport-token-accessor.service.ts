import { Store } from 'redux';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IStoreEntity,
  ITransportTokenAccessor,
} from '../../definition';
import { selectTransportWrapperToken } from '../../util';

@injectable()
export class TransportTokenAccessor implements ITransportTokenAccessor {
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IStoreEntity>;

  /**
   * @stable [16.09.2019]
   * @returns {string}
   */
  public get token(): string {
    return selectTransportWrapperToken(this.store.getState());
  }
}
