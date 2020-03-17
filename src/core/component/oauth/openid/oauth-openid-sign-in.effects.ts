import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';
import {
  AuthorizationRequest,
  AuthorizationServiceConfiguration,
  LocalStorageBackend,
  RedirectRequestHandler,
} from '@openid/appauth';

import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../../../di';
import {
  IEnvironment,
  IStorage,
  OAUTH_SIGN_IN_SECTION,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import {
  ConnectorActionBuilder,
  RouterActionBuilder,
} from '../../../action';
import { ApplicationActionBuilder } from '../../application/application-action.builder'; // TODO Move

@provideInSingleton(OAuthOpenIdSignInEffects)
export class OAuthOpenIdSignInEffects {
  private static readonly logger = LoggerFactory.makeLogger('OAuthOpenIdSignInEffects');

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.NotVersionedSessionStorage) private readonly notVersionedSessionStorage: IStorage;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [15.03.2020]
   * @returns {IEffectsAction}
   */
  @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(OAUTH_SIGN_IN_SECTION))
  public $onConnectorInit(): IEffectsAction {
    return RouterActionBuilder.buildRewriteAction(this.settings.routes.logout);
  }

  /**
   * @stable [15.03.2020]
   * @returns {Promise<void>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType(), true)
  public async $onAfterLogout(): Promise<void> {
    const entryPointUrl = 'TODO'; // TODO
    const configuration = await AuthorizationServiceConfiguration.fetchFromIssuer(entryPointUrl);

    OAuthOpenIdSignInEffects.logger.debug(() =>
      '[$OAuthOpenIdSignInEffects][$onAfterLogout] The configuration has been loaded successfully:', configuration);

    const oauthSettings = this.settings.oauth;
    const authorizationRequest = new AuthorizationRequest({
      client_id: oauthSettings.clientId,
      redirect_uri: this.environment.getSectionFullPath(this.settings.routes.oauthCallback),
      scope: oauthSettings.scope,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
    });

    const authorizationHandler = new RedirectRequestHandler(
      new LocalStorageBackend(this.notVersionedSessionStorage.storage)
    );
    authorizationHandler.performAuthorizationRequest(configuration, authorizationRequest);
  }
}
