import { injectable } from 'inversify';
import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../definitions.interface';
import { lazyInject, DI_TYPES } from '../di';
import {
  ifNotEmptyThanValue,
  orNull,
  selectToken,
  selectTransportWrapperToken,
} from '../util';
import { ISettingsEntity } from '../settings';
import {
  $RAC_APPLICATION_PREPARE_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE,
  IAuth,
  IRoutesEntity,
  IStorage,
  ITransportResponseAccessor,
  IUniversalStoreEntity,
  IVersionProcessor,
} from '../definition';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { BaseEffects } from '../store/effects/base.effects';
import { DictionariesActionBuilder } from '../dictionary/dictionaries-action.builder';
import { NotificationActionBuilder } from '../notification/notification-action.builder';
import { PermissionsActionBuilder } from '../permissions/permissions-action.builder';
import { RouterActionBuilder } from '../router/router-action.builder';
import { TransportActionBuilder } from '../transport/transport-action.builder';
import { userActionBuilder } from '../user';

@injectable()
export class UniversalApplicationEffects<TApi> extends BaseEffects<TApi> {
  private static logger = LoggerFactory.makeLogger('UniversalApplicationEffects');

  @lazyInject(DI_TYPES.Auth) protected readonly auth: IAuth;
  @lazyInject(DI_TYPES.NotVersionedPersistentStorage) protected notVersionedPersistentStorage: IStorage;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
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
    const token = await this.notVersionedPersistentStorage.get(this.authTokenKeyName);
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
   * @stable [17.11.2019]
   * @param {IEffectsAction} _
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterInitActionType())
  public async $onAfterInit(_: IEffectsAction): Promise<IEffectsAction[]> {
    const isAppAuthorized = this.auth.isAuthorized();
    const result = [
      isAppAuthorized
        ? ApplicationActionBuilder.buildPrepareAction()
        : ApplicationActionBuilder.buildReadyAction()
    ];

    if (await this.versionProcessor.processNewVersionUuidAndGetResult() && isAppAuthorized) {
      result.push(RouterActionBuilder.buildRewriteAction(this.routes.home));
      ifNotEmptyThanValue(
        this.settings.messages.NEW_APP_VERSION_HAS_BEEN_DEPLOYED,
        (message) => result.push(NotificationActionBuilder.buildInfoAction(message))
      );
    }

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAfterInit] The result is: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * @stable [13.11.2019]
   * @returns {Promise<AnyT> | IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects($RAC_APPLICATION_PREPARE_ACTION_TYPE)
  public $onPrepare(action: IEffectsAction,
                    state: IUniversalStoreEntity): Promise<AnyT> | IEffectsAction[] | IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  /**
   * @stable [18.11.2019]
   * @param {IEffectsAction} action
   * @returns {IEffectsAction}
   */
  @EffectsService.effects($RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE)
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
      userActionBuilder.buildDestroyAction(),
      DictionariesActionBuilder.buildDestroyAllAction(),
      ApplicationActionBuilder.buildUnauthorizedAction(),
      ApplicationActionBuilder.buildAfterLogoutAction()
    ];
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public async $onAfterLogout(): Promise<IEffectsAction[]> {
    return [
      TransportActionBuilder.buildDestroyTokenAction(),
      ...ifNotEmptyThanValue(
        this.settings.messages.logoutNotificationMessage,
        (logoutNotificationMessage) => [NotificationActionBuilder.buildInfoAction(logoutNotificationMessage)],
        []
      ),
      ...await this.checkIfNewVersionThenReload()
    ];
  }

  /**
   * @stable [17.11.2019]
   * @param {IEffectsAction} action
   * @param {IUniversalStoreEntity} state
   * @returns {Promise<void>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAuthorizedActionType())
  public async $onAuthorized(action: IEffectsAction, state: IUniversalStoreEntity): Promise<void> {
    const token = selectToken(action.data) || selectTransportWrapperToken(state);
    await this.notVersionedPersistentStorage.set(this.authTokenKeyName, token);

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onAuthorized] The storage token has been applied: ${token}`);
  }

  /**
   * @stable [17.11.2019]
   */
  @EffectsService.effects(ApplicationActionBuilder.buildUnauthorizedActionType())
  public async $onUnauthorized(): Promise<void> {
    await this.notVersionedPersistentStorage.remove(this.authTokenKeyName);

    UniversalApplicationEffects.logger.debug(() =>
      `[$UniversalApplicationEffects][$onUnauthorized] The storage token has been destroyed.`);
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<IEffectsAction[]>}
   */
  protected async checkIfNewVersionThenReload(): Promise<IEffectsAction[]> {
    if (await this.versionProcessor.processNewVersionUuidAndGetResult()) {
      return [RouterActionBuilder.buildReloadAction()];
    }
    return [];
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  protected get authTokenKeyName(): string {
    return this.settings.storage.authTokenKeyName;
  }
}
