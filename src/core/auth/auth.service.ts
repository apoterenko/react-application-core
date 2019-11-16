import { injectable } from 'inversify';
import { Store } from 'redux';

import {
  DI_TYPES,
  lazyInject,
} from '../di';
import {
  IAuth,
  IUniversalStoreEntity,
} from '../definition';

@injectable()
export class Auth implements IAuth {
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IUniversalStoreEntity>;

  /**
   * @stable [26.04.2018]
   * @returns {boolean}
   */
  public isAuthorized(): boolean {
    return this.store.getState().application.authorized;
  }
}
