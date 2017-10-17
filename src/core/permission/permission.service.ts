import { lazyInject, DI_TYPES, provideInSingleton } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorageService } from '../storage';
import { IApplicationPermissionService } from './permission.interface';

@provideInSingleton(PermissionService)
export class PermissionService<TApplicationAccessConfig>
    implements IApplicationPermissionService<TApplicationAccessConfig> {

  @lazyInject(DI_TYPES.TokenStorage) private tokenStorage: IApplicationStorageService;

  public isAccessible(permissionObject: TApplicationAccessConfig): boolean {
    return true;
  }

  public isAuthorized(): boolean {
    return !!this.tokenStorage.get(APPLICATION_TOKEN_KEY);
  }
}
