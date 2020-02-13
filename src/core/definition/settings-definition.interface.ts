import { IDefaultLayoutProps } from './layout-definition.interface';
import { ITitleProps } from './title-definition.interface';

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
  maxDate?: Date;
  minDate?: Date;
  uiDateFormat?: string;
  uiDateMask?: Array<string|RegExp>;
  uiDatePattern?: string;
  uiDefaultTime?: string;
  uiTimeFormat?: string;
  uiYearFormat?: string;
  uiYearMask?: Array<string|RegExp>;
  uiYearPattern?: string;
}

/**
 * @stable [25.12.2019]
 */
const defaultDateTimeSettingsEntity: IDateTimeSettingsEntity = {
  dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
  maxDate: new Date('01/01/4000'),
  minDate: new Date('01/01/1900'),
  uiDateFormat: 'YYYY-MM-DD',
  uiDateMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
  uiDefaultTime: '00:00:00',
  uiTimeFormat: 'HH:mm:ss',
  uiYearFormat: 'YYYY',
  uiYearMask: [/\d/, /\d/, /\d/, /\d/],
  uiYearPattern: '[0-9]{4}',
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
 * @entity
 * @stable [04.02.2020]
 */
export interface IComponentsSettingsEntity {
  defaultLayout?: IDefaultLayoutProps;
  title?: ITitleProps;
}

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IAsyncLibrariesSettingsEntity {
  googleMaps?: string;
}

/**
 * @default-entity
 * @stable [09.01.2020]
 */
export const DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY = Object.freeze<IAsyncLibrariesSettingsEntity>({
  googleMaps: 'https://maps.googleapis.com/maps/api/js',
});

/**
 * @stable [10.01.2020]
 */
export interface IGoogleMapsSettingsEntity {
  componentRestrictions?: {country?: string};
  lat?: number;
  libraries?: string;
  lng?: number;
  prettyZoom?: number;
  zoom?: number;
}

/**
 * @default-entity
 * @stable [10.01.2020]
 */
export const DEFAULT_GOOGLE_MAPS_SETTINGS_ENTITY = Object.freeze<IGoogleMapsSettingsEntity>({
  componentRestrictions: {country: 'us'},
  lat: 34.0522,
  libraries: 'places,visualization',
  lng: -118.2436,
  prettyZoom: 17,
  zoom: 13,
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
 * @entity
 * @stable [06.02.2020]
 */
export interface IUrlsSettingsEntity {
  emptyAvatar?: string;
}

/**
 * @default-entity
 * @stable [06.02.2020]
 */
export const DEFAULT_URLS_SETTINGS_ENTITY = Object.freeze<IUrlsSettingsEntity>({
  emptyAvatar: 'media/no_avatar.jpg',
});

/**
 * @stable [07.10.2019]
 */
export interface IMessagesSettingsEntity {
  ADDRESS_SELECTION?: string;
  APPLICATION_IS_INITIALIZING?: string;
  APPLY?: string;
  BUILD?: string;
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED?: string;
  CLEAR_ALL?: string;
  CLOSE?: string;
  CREATE?: string;
  DETAILS_INFO?: string;
  DIALOG_ACCEPT?: string;
  DIALOG_CANCEL?: string;
  DIALOG_DISCARD?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  FILTER_PLACEHOLDER?: string;
  FILTERS?: string;
  LOG_OUT?: string;
  MONTH?: string;
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED?: string;
  NO_DATA?: string;
  OK?: string;
  PATH?: string;
  PLEASE_WAIT?: string;
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER?: string;
  PUT_MARKER_HERE?: string;
  QUARTER?: string;
  RESET?: string;
  RESTART_APP?: string;
  SAVE?: string;
  SETTINGS?: string;
  SOMETHING_WENT_WRONG?: string;
  UNKNOWN_ERROR?: string;
  USER?: string;
  WAITING?: string;
  WEEK?: string;
  YEAR?: string;
}

/**
 * @stable [07.10.2019]
 */
export const DEFAULT_MESSAGES_SETTINGS_ENTITY = Object.freeze<IMessagesSettingsEntity>({
  ADDRESS_SELECTION: 'Address selection',
  APPLICATION_IS_INITIALIZING: 'The app is initializing...',
  APPLY: 'Apply',
  BUILD: 'Build',
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED: 'Changes you made will not be saved',
  CLEAR_ALL: 'Clear all',
  CLOSE: 'Close',
  CREATE: 'Create',
  DETAILS_INFO: 'Details info',
  DIALOG_ACCEPT: 'Continue',
  DIALOG_CANCEL: 'Cancel',
  DIALOG_DISCARD: 'Discard',
  ENVIRONMENT: 'Environment',
  ERROR: 'Error',
  FILTER_PLACEHOLDER: 'Search',
  FILTERS: 'Filters',
  LOG_OUT: 'Log out',
  MONTH: 'Month',
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED: 'The app has been updated! Let\'s go to the main page',
  NO_DATA: 'No data',
  OK: 'Ok',
  PATH: 'Path',
  PLEASE_WAIT: 'Please wait...',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  PUT_MARKER_HERE: 'Put marker here',
  QUARTER: 'Quarter',
  RESET: 'Reset',
  RESTART_APP: 'Restart App',
  SAVE: 'Save',
  SETTINGS: 'Settings',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  UNKNOWN_ERROR: 'Unknown error',
  USER: 'User',
  WAITING: 'Waiting...',
  WEEK: 'Week',
  YEAR: 'Year',
});
