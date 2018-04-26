import { injectable } from 'inversify';
import { Store } from 'redux';

import { lazyInject, DI_TYPES } from '../di';
import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { IAuthService } from './auth.interface';

@injectable()
export class AuthService implements IAuthService {

  @lazyInject(DI_TYPES.Store) private store: Store<IUniversalApplicationStoreEntity>;

  /**
   * @stable [26.04.2018]
   * @returns {boolean}
   */
  public isAuthorized(): boolean {
    return this.store.getState().application.authorized;
  }
}
