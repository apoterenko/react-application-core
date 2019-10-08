/**
 * @stable [07.10.2019]
 */
export interface IMessagesSettingsEntity {
  BUILD?: string;
  DETAILS_INFO?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  PATH?: string;
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER?: string;
  RESTART_APP?: string;
  SOMETHING_WENT_WRONG?: string;
  USER?: string;
}

/**
 * @stable [07.10.2019]
 */
export const DEFAULT_MESSAGES_SETTINGS_ENTITY = Object.freeze<IMessagesSettingsEntity>({
  BUILD: 'Build',
  DETAILS_INFO: 'Details info',
  ENVIRONMENT: 'Environment',
  ERROR: 'Error',
  PATH: 'Path',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  RESTART_APP: 'Restart App',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  USER: 'User',
});
