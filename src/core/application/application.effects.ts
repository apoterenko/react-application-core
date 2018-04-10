import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { APPLICATION_TOKEN_KEY, IApplicationStorage } from '../storage';
import { IDefaultApplicationState, BaseEffects } from '../store';
import { USER_DESTROY_ACTION_TYPE } from '../user';
import { ApplicationPermissionsServiceT, PERMISSIONS_DESTROY_ACTION_TYPE } from '../permissions';
import { ApplicationActionBuilder } from '../component/application';
import { IApplicationSettings } from '../settings';
import { IRootUpdatePathPayload, RootActionBuilder } from '../component/root';
import { FormActionBuilder } from '../component/form';
import { DictionariesActionBuilder } from '../dictionary';
import { TransportActionBuilder } from '../transport';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends BaseEffects<TApi> {
  private static logger = LoggerFactory.makeLogger(ApplicationEffects);

  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.NotVersionedStorage) protected notVersionedStorage: IApplicationStorage;
  @lazyInject(DI_TYPES.Permission) protected permissionService: ApplicationPermissionsServiceT;

  @EffectsService.effects(ApplicationActionBuilder.buildInitActionType())
  public onInit(): IEffectsAction[] {
    const token = this.notVersionedStorage.get(APPLICATION_TOKEN_KEY);
    return token
        ? [TransportActionBuilder.buildUpdateTokenAction({token})]
        : [];
  }

  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public onLogout(): IEffectsAction[] {
    const actions: IEffectsAction[] = this.permissionService.isAuthorized()
        ? [
          EffectsAction.create(USER_DESTROY_ACTION_TYPE),
          EffectsAction.create(PERMISSIONS_DESTROY_ACTION_TYPE),
          ApplicationActionBuilder.buildDestroyTokenAction()
        ]
        : [];

    return actions
        .concat(DictionariesActionBuilder.buildDestroyAction())
        .concat(ApplicationActionBuilder.buildAfterLogoutAction());
  }

  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public onAfterLogout(): IEffectsAction[]|Promise<IEffectsAction[]> {
    return [
      this.buildNotificationInfoAction(this.settings.messages.logoutNotificationMessage),
      TransportActionBuilder.buildDestroyTokenAction()
    ];
  }

  @EffectsService.effects(ApplicationActionBuilder.buildUpdateTokenActionType())
  public onUpdateToken(_: IEffectsAction, state: IDefaultApplicationState): void {
    this.notVersionedStorage.set(APPLICATION_TOKEN_KEY, state.transport.token);
  }

  @EffectsService.effects(ApplicationActionBuilder.buildDestroyTokenActionType())
  public onDestroyToken(): void {
    this.notVersionedStorage.remove(APPLICATION_TOKEN_KEY);
  }

  /**
   * Initial form state supporting
   */
  @EffectsService.effects(RootActionBuilder.buildPathUpdateActionType())
  public onUpdateRootPath(action: IEffectsAction): IEffectsAction {
    const payload = action.data as IRootUpdatePathPayload;
    const section = payload.section;
    const changes = payload.changes;

    if (!changes || Object.keys(changes).length === 0) {
      return null;
    }
    if (!section) {
      ApplicationEffects.logger.warn(
          '[$ApplicationEffects][onUpdateRootPath] Section parameter is empty but changes are exists:',
          changes
      );
      return null;
    }
    return FormActionBuilder.buildChangesAction(section, changes);
  }
}
