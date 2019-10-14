import { Store } from 'redux';

import { IStoreEntity, IPermissionsService } from '../definition';
import { lazyInject, DI_TYPES, provideInSingleton } from '../di';

@provideInSingleton(PermissionsService)
export class PermissionsService<TAccessConfig, TStore = IStoreEntity>
  implements IPermissionsService<TAccessConfig> {

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
