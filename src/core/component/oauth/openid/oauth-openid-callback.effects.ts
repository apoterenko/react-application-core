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
} from '../../../di';
import {
  IAuth,
  IEnvironment,
  IFieldConverter,
  IStorage,
  OAUTH_CALLBACK_SECTION,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import {
  ConnectorActionBuilder,
  userActionBuilder,
} from '../../../action';
import { decodeJwt } from '../../../util/jwt';
import {
  ICodeWrapper,
  IKeyValue,
  UNDEF,
} from '../../../definitions.interface';
import { ApplicationActionBuilder } from '../../application/application-action.builder'; // TODO Move
import { notNilValuesFilter } from '../../../util';

@provideInSingleton(OAuthOpenIdCallbackEffects)
export class OAuthOpenIdCallbackEffects {
  private static readonly logger = LoggerFactory.makeLogger('OAuthOpenIdCallbackEffects');

  // See inside the "@openid/appauth" package
  private static readonly AUTHORIZATION_REQUEST_HANDLE_KEY = 'appauth_current_authorization_request';

  @lazyInject(DI_TYPES.Auth) private readonly auth: IAuth;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.FieldConverter) private readonly fieldConverter: IFieldConverter;
  @lazyInject(DI_TYPES.NotVersionedSessionStorage) private readonly notVersionedSessionStorage: IStorage;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [13.03.2020]
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(OAUTH_CALLBACK_SECTION))
  public async $onConnectorInit(): Promise<IEffectsAction[]> {
    if (this.auth.isAuthorized()) {
      OAuthOpenIdCallbackEffects.logger.debug(() =>
        `[$OAuthOpenIdCallbackEffects][$onConnectorInit] The application is already authorized, exit...`);
      return null;
    }

    const params = this.environment.getUrlQueryParams<ICodeWrapper>();
    const code = params.code;

    const key = await this.getValueFromStorage<string>(OAuthOpenIdCallbackEffects.AUTHORIZATION_REQUEST_HANDLE_KEY);
    const authRequest = await this.getValueFromStorage(this.authorizationRequestKey(key));

    const request = new TokenRequest({
      client_id: this.settings.oauth.clientId,
      redirect_uri: this.environment.getSectionFullPath(this.settings.routes.oauthCallback),
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code,
      refresh_token: UNDEF,
      extras: notNilValuesFilter({code_verifier: authRequest.internal.code_verifier}),
    });

    const configuration = await this.getValueFromStorage<AuthorizationServiceConfigurationJson>(
      this.authorizationServiceConfigurationKey(key)
    );

    const tokenHandler = new BaseTokenRequestHandler();
    const response = await tokenHandler.performTokenRequest(new AuthorizationServiceConfiguration(configuration), request);

    OAuthOpenIdCallbackEffects.logger.debug(() =>
      `[$OAuthOpenIdCallbackEffects][$onConnectorInit] The token has been generated successfully. The token payload:`, response);

    const token = response.accessToken;

    return [
      userActionBuilder.buildReplaceAction(
        this.fieldConverter.fromOAuthJwtDecodedInfoToUserEntity(decodeJwt(token))
      ),
      ApplicationActionBuilder.buildAfterLoginAction({token})
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
   * See inside the "@openid/appauth" package
   *
   * @stable [13.03.2020]
   * @param {string} handle
   * @returns {string}
   */
  private readonly authorizationRequestKey = (handle: string) => `${handle}_appauth_authorization_request`;

  /**
   * See inside the "@openid/appauth" package
   *
   * @stable [13.03.2020]
   * @param {string} handle
   * @returns {string}
   */
  private readonly authorizationServiceConfigurationKey =
    (handle: string) => `${handle}_appauth_authorization_service_configuration`
}
