import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { APPLICATION_TOKEN_KEY, IStorage } from '../storage';
import { IApplicationPermissionsService } from './permission.interface';

@provideInSingleton(PermissionService)
export class PermissionService<TApplicationAccessConfig>
    implements IApplicationPermissionsService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.TokenStorage) private tokenStorage: IStorage;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return !!this.tokenStorage.get(APPLICATION_TOKEN_KEY);
  }
}
