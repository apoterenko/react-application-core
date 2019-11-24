/**
 * @stable [09.10.2019]
 */
export enum RegexpEnum {
  PRICE = '\\d+(\\.\\d{1,2})?',
  NUMBER = '[-+]?[0-9]*[.,]?[0-9]+',
  DIGITAL = '[0-9]+',
}

export interface ICurrencySettingsEntity {
  uiLocale?: string;
  uiCurrency?: string;
  uiShortCurrency?: string;
}

/**
 * @stable [15.10.2019]
 */
export const DEFAULT_CURRENCY_SETTINGS_ENTITY = Object.freeze<ICurrencySettingsEntity>({
  uiLocale: 'en-US',
  uiCurrency: 'USD',
  uiShortCurrency: '$',
});

/**
 * @stable [07.10.2019]
 */
export interface IMessagesSettingsEntity {
  BUILD?: string;
  DETAILS_INFO?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  FILTER_PLACEHOLDER?: string;
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED?: string;
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
  FILTER_PLACEHOLDER: 'Search',
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED: 'The app has been updated! Let\'s go to the main page',
  PATH: 'Path',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  RESTART_APP: 'Restart App',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  USER: 'User',
});
