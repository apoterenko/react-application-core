import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorage } from '../storage';
import { ApplicationStateT, BaseEffects } from '../store';
import { USER_DESTROY_ACTION_TYPE } from '../user';
import { ApplicationPermissionServiceT, PERMISSION_DESTROY_ACTION_TYPE } from '../permission';
import { ApplicationActionBuilder } from '../component/application';
import { IApplicationSettings } from '../settings';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.NotVersionedStorage) protected notVersionedStorage: IApplicationStorage;
  @lazyInject(DI_TYPES.Permission) protected permissionService: ApplicationPermissionServiceT;

  @EffectsService.effects(ApplicationActionBuilder.buildInitActionType())
  public onInit(): IEffectsAction[] {
    const token = this.notVersionedStorage.get(APPLICATION_TOKEN_KEY);
    return token
        ? [this.buildTransportUpdateTokenAction({token})]
        : [];
  }

  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public onLogout(): IEffectsAction[] {
    const actions: IEffectsAction[] = this.permissionService.isAuthorized()
        ? [
          EffectsAction.create(USER_DESTROY_ACTION_TYPE),
          EffectsAction.create(PERMISSION_DESTROY_ACTION_TYPE),
          this.buildApplicationDestroyTokenAction()
        ]
        : [];

    return actions
        .concat(this.buildContainersDestroyActions())
        .concat(this.buildDictionariesDestroyAction())
        .concat(this.buildApplicationAfterLogoutAction());
  }

  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public onAfterLogout(): IEffectsAction[]|Promise<IEffectsAction[]> {
    return [
      this.buildNotificationInfoAction(this.settings.logoutNotificationMessage),
      this.buildTransportDestroyTokenAction()
    ];
  }

  @EffectsService.effects(ApplicationActionBuilder.buildUpdateTokenActionType())
  public onUpdateToken(_: IEffectsAction, state: ApplicationStateT): void {
    this.notVersionedStorage.set(APPLICATION_TOKEN_KEY, state.transport.token);
  }

  @EffectsService.effects(ApplicationActionBuilder.buildDestroyTokenActionType())
  public onDestroyToken(): void {
    this.notVersionedStorage.remove(APPLICATION_TOKEN_KEY);
  }
}
