import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorage } from '../storage';
import { IApplicationPermissionsService } from './permissions.interface';

@provideInSingleton(PermissionsService)
export class PermissionsService<TApplicationAccessConfig>
    implements IApplicationPermissionsService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.NotVersionedStorage) private notVersionedStorage: IApplicationStorage;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return !!this.notVersionedStorage.get(APPLICATION_TOKEN_KEY);
  }
}
