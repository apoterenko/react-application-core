/**
 * @stable [09.10.2019]
 */
export enum RegexpEnum {
  PRICE = '\\d+(\\.\\d{1,2})?',
  NUMBER = '[-+]?[0-9]*[.,]?[0-9]+',
  DIGITAL = '[0-9]+',
}

/**
 * @stable [09.10.2019]
 */
export const REGEXP = {
  DIGITAL: new RegExp(RegexpEnum.DIGITAL),
  PRICE: new RegExp(RegexpEnum.PRICE),
};

/**
 * @stable [25.12.2019]
 */
export interface IDateTimeSettingsEntity {
  currentDate?: Date;
  dateTimeFormat?: string;
  uiDateFormat?: string;
  uiDefaultTime?: string;
  uiTimeFormat?: string;
}

/**
 * @stable [25.12.2019]
 */
const defaultDateTimeSettingsEntity: IDateTimeSettingsEntity = {
  dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
  uiDateFormat: 'YYYY-MM-DD',
  uiDefaultTime: '00:00:00',
  uiTimeFormat: 'HH:mm:ss',
};

Reflect.defineProperty(defaultDateTimeSettingsEntity, 'currentDate', {
  get: () => new Date(),    // To prevent "24h" cache issue
});

/**
 * @stable [25.12.2019]
 */
export const DEFAULT_DATE_TIME_SETTINGS_ENTITY = Object.freeze<IDateTimeSettingsEntity>(defaultDateTimeSettingsEntity);

/**
 * @stable [29.11.0219]
 */
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
 * @stable [29.11.0219]
 */
export interface IPhoneSettingsEntity {
  countryAbbr?: string;
  uiMask?: Array<string|RegExp>;
}

/**
 * @stable [29.11.0219]
 */
export const DEFAULT_PHONE_SETTINGS_ENTITY = Object.freeze<IPhoneSettingsEntity>({
  countryAbbr: 'US',
  uiMask: ['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
});

/**
 * @stable [07.10.2019]
 */
export interface IMessagesSettingsEntity {
  APPLICATION_IS_INITIALIZING?: string;
  BUILD?: string;
  DETAILS_INFO?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  FILTER_PLACEHOLDER?: string;
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED?: string;
  PATH?: string;
  PLEASE_WAIT?: string;
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER?: string;
  RESTART_APP?: string;
  SOMETHING_WENT_WRONG?: string;
  UNKNOWN_ERROR?: string;
  USER?: string;
}

/**
 * @stable [07.10.2019]
 */
export const DEFAULT_MESSAGES_SETTINGS_ENTITY = Object.freeze<IMessagesSettingsEntity>({
  APPLICATION_IS_INITIALIZING: 'The app is initializing...',
  BUILD: 'Build',
  DETAILS_INFO: 'Details info',
  ENVIRONMENT: 'Environment',
  ERROR: 'Error',
  FILTER_PLACEHOLDER: 'Search',
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED: 'The app has been updated! Let\'s go to the main page',
  PATH: 'Path',
  PLEASE_WAIT: 'Please wait...',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  RESTART_APP: 'Restart App',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  UNKNOWN_ERROR: 'Unknown error',
  USER: 'User',
});
