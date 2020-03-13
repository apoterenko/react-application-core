/**
 * @stable [16.11.2019]
 */
export interface IAuth {
  isAuthorized(): boolean;
}

/**
 * @stable [13.03.2020]
 */
export const OAUTH_CALLBACK_SECTION = 'RAC:OAUTH-CALLBACK';
