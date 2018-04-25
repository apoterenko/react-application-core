import { Store } from 'redux';
import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { IApplicationPermissionsService } from './permissions.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';

@provideInSingleton(PermissionsService)
export class PermissionsService<TApplicationAccessConfig>
  implements IApplicationPermissionsService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.Store) protected store: Store<IApplicationStoreEntity>;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return this.store.getState().application.authorized;
  }
}
