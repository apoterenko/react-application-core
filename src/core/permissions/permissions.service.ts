import { Store } from 'redux';

import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { IPermissionsService } from './permissions.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';

@provideInSingleton(PermissionsService)
export class PermissionsService<TAccessConfig> implements IPermissionsService<TAccessConfig> {

  @lazyInject(DI_TYPES.Store) protected store: Store<IApplicationStoreEntity>;

  public isAccessible(permissionObject: TAccessConfig): boolean {
    return true;
  }
}
