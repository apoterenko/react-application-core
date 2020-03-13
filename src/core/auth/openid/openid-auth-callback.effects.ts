import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';
import {
  AuthorizationServiceConfiguration,
  AuthorizationServiceConfigurationJson,
  BaseTokenRequestHandler,
  GRANT_TYPE_AUTHORIZATION_CODE,
  TokenRequest,
} from '@openid/appauth';

import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../../di';
import {
  IAuth,
  IEnvironment,
  IStorage,
  OAUTH_CALLBACK_SECTION,
} from '../../definition';
import { ISettingsEntity } from '../../settings';
import { ConnectorActionBuilder } from '../../action';
import {
  ICodeWrapper,
  IKeyValue,
  UNDEF,
} from '../../definitions.interface';
import { TransportActionBuilder } from '../../transport';
import { ApplicationActionBuilder } from '../../component/application/application-action.builder';

@provideInSingleton(OpenIdAuthCallbackEffects)
export class OpenIdAuthCallbackEffects {
  private static readonly logger = LoggerFactory.makeLogger('OpenIdAuthCallbackEffects');

  private static readonly AUTHORIZATION_REQUEST_HANDLE_KEY = 'appauth_current_authorization_request';

  @lazyInject(DI_TYPES.Auth) private readonly auth: IAuth;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.NotVersionedSessionStorage) private readonly notVersionedSessionStorage: IStorage;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [13.03.2020]
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(OAUTH_CALLBACK_SECTION))
  public async $onConnectorInit(): Promise<IEffectsAction[]> {
    if (this.auth.isAuthorized()) {
      OpenIdAuthCallbackEffects.logger.debug(() =>
        `[$OAuth2callbackContainerEffects][$onConnectorInit] The application is already authorized, exit...`);
      return null;
    }

    const params = this.environment.getUrlQueryParams<ICodeWrapper>();
    const code = params.code;

    const key = await this.getValueFromStorage<string>(OpenIdAuthCallbackEffects.AUTHORIZATION_REQUEST_HANDLE_KEY);
    const authRequest = await this.getValueFromStorage(this.authorizationRequestKey(key));

    const request = new TokenRequest({
      client_id: this.settings.oauth.clientId,
      redirect_uri: this.environment.getSectionFullPath(this.settings.routes.oauthCallback),
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code,
      refresh_token: UNDEF,
      extras: {
        code_verifier: authRequest.extras.code_verifier,
      },
    });

    const configuration = await this.getValueFromStorage<AuthorizationServiceConfigurationJson>(
      this.authorizationServiceConfigurationKey(key)
    );

    const tokenHandler = new BaseTokenRequestHandler();
    const response = await tokenHandler.performTokenRequest(new AuthorizationServiceConfiguration(configuration), request);

    OpenIdAuthCallbackEffects.logger.debug(() =>
      `[$OAuth2callbackContainerEffects][$onConnectorInit] The token has been generated successfully. The token payload:`, response);

    return [
      TransportActionBuilder.buildUpdateTokenAction({token: response.accessToken}),
      ApplicationActionBuilder.buildAuthorizedAction()
    ];
  }

  /**
   * @stable [13.03.2020]
   * @param {string} key
   * @returns {Promise<TResult>}
   */
  private getValueFromStorage<TResult = IKeyValue>(key: string): Promise<TResult> {
    return this.notVersionedSessionStorage.get(key, true);
  }

  /**
   * @see @openid/appauth
   * @stable [13.03.2020]
   * @param {string} handle
   * @returns {string}
   */
  private readonly authorizationRequestKey = (handle: string) => `${handle}_appauth_authorization_request`;

  /**
   * @see @openid/appauth
   * @stable [13.03.2020]
   * @param {string} handle
   * @returns {string}
   */
  private readonly authorizationServiceConfigurationKey =
    (handle: string) => `${handle}_appauth_authorization_service_configuration`
}
