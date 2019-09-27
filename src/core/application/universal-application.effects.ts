import { injectable } from 'inversify';
import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import { orNull } from '../util';
import { ISettings } from '../settings';
import {
  IRoutesEntity,
  IStorage,
  ITransportResponseAccessor,
  IUniversalStoreEntity,
  IVersionProcessor,
  STORAGE_APP_TOKEN_KEY,
} from '../definition';
import { ITokenWrapper } from '../definitions.interface';
import { BaseEffects } from '../store/effects/base.effects';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { DictionariesActionBuilder } from '../dictionary/dictionaries-action.builder';
import { TransportActionBuilder } from '../transport/transport-action.builder';
import { NotificationActionBuilder } from '../notification/notification-action.builder';
import { UserActionBuilder } from '../user/user-action.builder';
import { RouterActionBuilder } from '../router/router-action.builder';
import { PermissionsActionBuilder } from '../permissions/permissions-action.builder';

@injectable()
export class UniversalApplicationEffects<TApi> extends BaseEffects<TApi> {
  private static logger = LoggerFactory.makeLogger('UniversalApplicationEffects');

  @lazyInject(DI_TYPES.NotVersionedPersistentStorage) protected notVersionedPersistentStorage: IStorage;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettings;
  @lazyInject(DI_TYPES.TransportResponseAccessor) protected responseAccessor: ITransportResponseAccessor;
  @lazyInject(DI_TYPES.VersionProcessor) protected readonly versionProcessor: IVersionProcessor;

  /**
   * @stable - 25.04.2018
   * @returns {Promise<IEffectsAction[]> | IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildInitActionType())
  public async $onInit(): Promise<IEffectsAction[]> {
    if (this.settings.authorization.isAuthorizationNeeded === false) {
      return [
        ApplicationActionBuilder.buildAuthorizedAction(),
        ApplicationActionBuilder.buildAfterInitAction()
      ];
    }
    const token = await this.notVersionedPersistentStorage.get(STORAGE_APP_TOKEN_KEY);
    const actions = [];

    if (token) {
      actions.push(ApplicationActionBuilder.buildAuthorizedAction({token}));
      actions.push(TransportActionBuilder.buildUpdateTokenAction({token}));
    }
    const result = actions.concat(ApplicationActionBuilder.buildAfterInitAction());

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onInit] The actions are: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * @stable [16.09.2019]
   * @param {IEffectsAction} _
   * @param {IUniversalStoreEntity} state
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterInitActionType())
  public async $onAfterInit(_: IEffectsAction, state: IUniversalStoreEntity): Promise<IEffectsAction[]> {
    const isApplicationAuthorized = state.application.authorized;
    const result: IEffectsAction[] = [
      isApplicationAuthorized
        ? ApplicationActionBuilder.buildPrepareAction()
        : ApplicationActionBuilder.buildReadyAction()
    ];

    if (await this.versionProcessor.processNewVersionUuidAndGetResult() && isApplicationAuthorized) {
      result.push(RouterActionBuilder.buildRewriteAction(this.routes.home));
      result.push(NotificationActionBuilder.buildInfoAction(this.settings.messages.newAppVersionHasBeenDeployedMessage));
    }

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAfterInit] The result is: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * @stable - 25.04.2018
   * @returns {Promise<AnyT> | IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareActionType())
  public $onPrepare(): Promise<AnyT> | IEffectsAction[] | IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  /**
   * @stable - 25.04.2018
   * @returns {Promise<AnyT> | IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareDoneActionType())
  public $onPrepareDone(action: IEffectsAction,
                        state: IUniversalStoreEntity): Promise<AnyT> | IEffectsAction[] | IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  /**
   * @stable [05.02.2019]
   * @param {IEffectsAction} action
   * @returns {IEffectsAction}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildPrepareErrorActionType())
  public $onPrepareError(action: IEffectsAction): IEffectsAction {
    return orNull(
      this.responseAccessor.isAuthError(action.error),
      () => (
        /**
         * We should show the login page instead of error page, therefore we clear an auth error before
         * page rendering.
         */
        ApplicationActionBuilder.buildReadyAction()
      )
    );
  }

  /**
   * @stable [26.09.2019]
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLoginActionType())
  public $onAfterLogin(): IEffectsAction[] {
    return [
      ApplicationActionBuilder.buildNotReadyAction(),
      ApplicationActionBuilder.buildAuthorizedAction(),
      ApplicationActionBuilder.buildPrepareAction(),
      RouterActionBuilder.buildNavigateAction(this.routes.home) // Need to replace "/logout"
    ];
  }

  /**
   * @stable - 25.04.2018
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public $onLogout(): IEffectsAction[] {
    return [
      PermissionsActionBuilder.buildDestroyAction(),
      UserActionBuilder.buildDestroyAction(),
      DictionariesActionBuilder.buildDestroyAction(),
      ApplicationActionBuilder.buildUnauthorizedAction(),
      ApplicationActionBuilder.buildAfterLogoutAction()
    ];
  }

  /**
   * @stable [16.09.2019]
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public async $onAfterLogout(): Promise<IEffectsAction[]> {
    await this.processNewVersionAndReload();
    return [
      NotificationActionBuilder.buildInfoAction(this.settings.messages.logoutNotificationMessage),
      TransportActionBuilder.buildDestroyTokenAction()
    ];
  }

  /**
   * @stable - 25.04.2018
   * @param {IEffectsAction} action
   * @param {IUniversalStoreEntity} state
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAuthorizedActionType())
  public async $onAuthorized(action: IEffectsAction, state: IUniversalStoreEntity): Promise<void> {
    const payload: ITokenWrapper = action.data;
    const token = payload && payload.token || state.transport.token;

    await this.notVersionedPersistentStorage.set(STORAGE_APP_TOKEN_KEY, token);
    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAuthorized] The storage token has been saved: ${token}.`);
  }

  /**
   * @stable - 25.04.2018
   */
  @EffectsService.effects(ApplicationActionBuilder.buildUnauthorizedActionType())
  public async $onUnauthorized(): Promise<void> {
    await this.notVersionedPersistentStorage.remove(STORAGE_APP_TOKEN_KEY);
    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onUnauthorized] The storage token has been destroyed.`);
  }

  /**
   * @stable [16.09.2019]
   * @returns {Promise<void>}
   */
  protected async processNewVersionAndReload(): Promise<void> {
    if (await this.versionProcessor.processNewVersionUuidAndGetResult()) {
      location.reload();
    }
  }
}
