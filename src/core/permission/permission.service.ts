import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorage } from '../storage';
import { IApplicationPermissionService } from './permission.interface';

@provideInSingleton(PermissionService)
export class PermissionService<TApplicationAccessConfig>
    implements IApplicationPermissionService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.NotVersionedStorage) private notVersionedStorage: IApplicationStorage;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return !!this.notVersionedStorage.get(APPLICATION_TOKEN_KEY);
  }
}
