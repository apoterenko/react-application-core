import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorage } from '../storage';
import { IApplicationPermissionsService } from './permissions.interface';
import { IApplicationSettings } from '../settings';

@provideInSingleton(PermissionsService)
export class PermissionsService<TApplicationAccessConfig>
    implements IApplicationPermissionsService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.NotVersionedStorage) private notVersionedStorage: IApplicationStorage;
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return !this.settings.authorization.isAuthorizationNeeded ||
      !!this.notVersionedStorage.get(APPLICATION_TOKEN_KEY);
  }
}
