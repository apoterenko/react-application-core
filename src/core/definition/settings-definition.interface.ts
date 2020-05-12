import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TDO
import { IDefaultLayoutProps } from './layout-definition.interface';
import { IDialogProps } from './dialog-definition.interface';
import { IFieldProps } from './field-definition.interface';
import { IHeaderProps } from './header-definition.interface';
import { IListItemProps } from './list-definition.interface';
import { ITitleProps } from './title-definition.interface';

/**
 * @stable [03.05.2020]
 */
export enum StartDaysOfWeekEnum {
  MONDAY,
  SUNDAY,
}

/**
 * @stable [09.10.2019]
 */
export enum RegexpEnum {
  DIGITAL = '[0-9]+',
  NUMBER = '[-+]?[0-9]*[.,]?[0-9]+',
  POSITIVE_NEGATIVE_PRICE = '[-+]?\\d+(\\.\\d{1,2})?',
  PRICE = '\\d+(\\.\\d{1,2})?',
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
  startDayOfWeek?: StartDaysOfWeekEnum;
  uiDateFormat?: string;
  uiDateMask?: Array<string|RegExp>;
  uiDatePattern?: string;
  uiDefaultTime?: string;
  uiTimeFormat?: string;
  uiYearMonthFormat?: string;
  uiYearPattern?: string;
}

/**
 * @stable [25.12.2019]
 */
const defaultDateTimeSettingsEntity: IDateTimeSettingsEntity = {
  dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
  maxDate: new Date('01/01/4000'),
  minDate: new Date('01/01/1900'),
  startDayOfWeek: StartDaysOfWeekEnum.MONDAY,
  uiDateFormat: 'YYYY-MM-DD',
  uiDateMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
  uiDefaultTime: '00:00:00',
  uiTimeFormat: 'HH:mm:ss',
  uiYearMonthFormat: 'MMMM YYYY',
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
  baseSelect?: IBaseSelectProps;
  defaultLayout?: IDefaultLayoutProps;
  dialog?: IDialogProps;
  field?: IFieldProps;
  header?: IHeaderProps;
  listItem?: IListItemProps;
  title?: ITitleProps;
}

/**
 * @default-entity
 * @stable [24.03.2020]
 */
export const DEFAULT_COMPONENTS_SETTINGS_ENTITY = Object.freeze<IComponentsSettingsEntity>({});

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IRoutesSettingsEntity {
  home?: string;
  logout?: string;
  oauthCallback?: string;
  oauthSignIn?: string;
  profile?: string;
}

/**
 * @default-entity
 * @stable [09.01.2020]
 */
export const DEFAULT_ROUTES_SETTINGS_ENTITY = Object.freeze<IRoutesSettingsEntity>({
  home: '/',
  logout: '/logout',
  oauthCallback: '/oauth2callback',
  oauthSignIn: '/oauth2sign_in',
  profile: '/profile',
});

/**
 * @entity
 * @stable [13.03.2020]
 */
export interface IOAuthSettingsEntity {
  clientId?: string;
  scope?: string;
}

/**
 * @default-entity
 * @stable [13.03.2020]
 */
export const DEFAULT_OAUTH_SETTINGS_ENTITY = Object.freeze<IOAuthSettingsEntity>({
  clientId: 'spa',
  scope: 'internal-api',
});

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
  pdfWorker?: string;
}

/**
 * @default-entity
 * @stable [06.02.2020]
 */
export const DEFAULT_URLS_SETTINGS_ENTITY = Object.freeze<IUrlsSettingsEntity>({
  emptyAvatar: 'media/no_avatar.jpg',
  pdfWorker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.489/pdf.worker.min.js',
});

/**
 * @stable [07.10.2019]
 */
export interface IMessagesSettingsEntity {
  ADDRESS_SELECTION?: string;
  AN_ERROR_OCCURRED_DURING_LOADING_THE_FILE?: string;
  APPLICATION_IS_INITIALIZING?: string;
  APPLY?: string;
  BUILD?: string;
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED?: string;
  CLEAR_ALL?: string;
  CLOSE?: string;
  COMPARE_TO?: string;
  CREATE?: string;
  CUSTOM?: string;
  DATA_HAS_BEEN_SUCCESSFULLY_SAVED?: string;
  DATE?: string;
  DAY?: string;
  DETAILS_INFO?: string;
  DIALOG_ACCEPT?: string;
  DIALOG_CANCEL?: string;
  DIALOG_DISCARD?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  EXPORT?: string;
  FILTERS?: string;
  FIRST?: string;
  LAST?: string;
  LAST_MONTH?: string;
  LAST_QUARTER?: string;
  LAST_WEEK?: string;
  LAST_YEAR?: string;
  LOG_OUT?: string;
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED?: string;
  NEXT?: string;
  NO_AVAILABLE_ITEMS_TO_SELECT?: string;
  NO_DATA?: string;
  OK?: string;
  PAGES_INFO?: string;
  PATH?: string;
  PLEASE_WAIT?: string;
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER?: string;
  PREVIEW?: string;
  PREVIOUS?: string;
  PUT_MARKER_HERE?: string;
  REFRESH?: string;
  RESET?: string;
  RESTART_APP?: string;
  SAVE?: string;
  SEARCH?: string;
  SETTINGS?: string;
  SHORT_PAGES_INFO?: string;
  SOMETHING_WENT_WRONG?: string;
  THIS_MONTH?: string;
  THIS_QUARTER?: string;
  THIS_WEEK?: string;
  TODAY?: string;
  UNKNOWN_ERROR?: string;
  USER?: string;
  WAITING?: string;
  YEAR?: string;
  YESTERDAY?: string;
}

/**
 * @stable [07.10.2019]
 */
export const DEFAULT_MESSAGES_SETTINGS_ENTITY = Object.freeze<IMessagesSettingsEntity>({
  ADDRESS_SELECTION: 'Address selection',
  AN_ERROR_OCCURRED_DURING_LOADING_THE_FILE: 'An error occurred during loading the file',
  APPLICATION_IS_INITIALIZING: 'The app is initializing...',
  APPLY: 'Apply',
  BUILD: 'Build',
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED: 'Changes you made will not be saved',
  CLEAR_ALL: 'Clear all',
  CLOSE: 'Close',
  COMPARE_TO: 'Compare to',
  CREATE: 'Create',
  CUSTOM: 'Custom',
  DATA_HAS_BEEN_SUCCESSFULLY_SAVED: 'The data has been successfully saved',
  DATE: 'Date',
  DAY: 'Day',
  DETAILS_INFO: 'Details info',
  DIALOG_ACCEPT: 'Continue',
  DIALOG_CANCEL: 'Cancel',
  DIALOG_DISCARD: 'Discard',
  ENVIRONMENT: 'Environment',
  ERROR: 'Error',
  EXPORT: 'Export',
  FILTERS: 'Filters',
  FIRST: 'First',
  LAST: 'Last',
  LAST_MONTH: 'Last month',
  LAST_QUARTER: 'Last quarter',
  LAST_WEEK: 'Last week',
  LAST_YEAR: 'Last year',
  LOG_OUT: 'Log out',
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED: 'The app has been updated! Let\'s go to the main page',
  NEXT: 'Next',
  NO_AVAILABLE_ITEMS_TO_SELECT: 'No available items to select',
  NO_DATA: 'No data',
  OK: 'Ok',
  PAGES_INFO: '{from}-{to} of {count}',
  PATH: 'Path',
  PLEASE_WAIT: 'Please wait...',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  PREVIEW: 'Preview',
  PREVIOUS: 'Previous',
  PUT_MARKER_HERE: 'Put marker here',
  REFRESH: 'Refresh',
  RESET: 'Reset',
  RESTART_APP: 'Restart App',
  SAVE: 'Save',
  SEARCH: 'Search',
  SETTINGS: 'Settings',
  SHORT_PAGES_INFO: 'Page {page} of {count}',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  THIS_MONTH: 'This month',
  THIS_QUARTER: 'This quarter',
  THIS_WEEK: 'This week',
  TODAY: 'Today',
  UNKNOWN_ERROR: 'Unknown error',
  USER: 'User',
  WAITING: 'Waiting...',
  YEAR: 'Year',
  YESTERDAY: 'Yesterday',
});
