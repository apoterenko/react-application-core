import { Store } from 'redux';
import { injectable } from 'inversify';

import { IDefaultApplicationState } from '../store';
import { lazyInject, DI_TYPES } from '../di';

import { IApplicationTransportTokenAccessor } from './transport.interface';

@injectable()
export class TransportTokenAccessor implements IApplicationTransportTokenAccessor {

  @lazyInject(DI_TYPES.Store) private store: Store<IDefaultApplicationState>;

  public get token(): string {
    return this.store.getState().transport.token;
  }
}
