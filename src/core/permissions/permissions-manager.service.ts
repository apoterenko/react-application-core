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
export class PermissionsManager<TPermission, TPermissions, TStore = IUniversalStoreEntity>
  implements IPermissionsManager<TPermission, TPermissions> {

  @lazyInject(DI_TYPES.Store) private readonly store: Store<TStore>;

  /**
   *
   * @param {TPermission} checkedObject
   * @returns {boolean}
   */
  public isAccessible(checkedObject: TPermission): boolean {
    return true;
  }

  public hasPermission(permissions: TPermissions, checkedObject: TPermission): boolean {
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
