import { Store } from 'redux';
import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../../di';
import { ITransportTokenAccessor } from '../../definition';
import { IApplicationStoreEntity } from '../../entities-definitions.interface';

@injectable()
export class TransportTokenAccessor implements ITransportTokenAccessor {
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IApplicationStoreEntity>;

  /**
   * @stable [16.09.2019]
   * @returns {string}
   */
  public get token(): string {
    return this.store.getState().transport.token;
  }
}
