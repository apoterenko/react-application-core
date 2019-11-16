import { Store } from 'redux';

import {
  IPermissionsManager,
  IUniversalStoreEntity,
} from '../definition';
import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';

@provideInSingleton(PermissionsManager)
export class PermissionsManager<TAccessConfig, TStore = IUniversalStoreEntity>
  implements IPermissionsManager<TAccessConfig> {

  @lazyInject(DI_TYPES.Store) private readonly store: Store<TStore>;

  /**
   * @stable [18.09.2019]
   * @param {TAccessConfig} permissionObject
   * @returns {boolean}
   */
  public isAccessible(permissionObject: TAccessConfig): boolean {
    return true;
  }

  /**
   * @stable [17.09.2019]
   * @returns {TStore}
   */
  protected getState(): TStore {
    return this.store.getState();
  }
}
