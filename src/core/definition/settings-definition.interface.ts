import { ElementsMarkersEnum } from './dom-definition.interface';
import { IBaseSelectProps } from './select-definition.interface';
import {
  IBasicListProps,
  IListItemProps,
} from './list-definition.interface';
import { IButtonProps } from './button-definition.interface';
import { IChartProps } from './chart-definition.interface';
import { IDefaultLayoutProps } from './default-layout-definition.interface';
import { IDialogProps } from './dialog-definition.interface';
import { IDrawerProps } from './drawer-definition.interface';
import { IFieldProps } from './field-definition.interface';
import { IFormLayoutProps } from './layout-definition.interface';
import {
  IGridHeadProps,
  IGridRowProps,
} from './grid-definition.interface';
import { IHeaderProps } from './header-definition.interface';
import { IInlineOptionProps } from './inline-option-definition.interface';
import { IMainProps } from './main-definition.interface';
import { INavigationListProps } from './navigation-list-definition.interface';
import { INumberFieldProps } from '../component/field/numberfield/numberfield.interface';  // TODO
import { IPageToolbarProps } from './toolbar-definition.interface';
import { ISaveAsNewTemplateProps } from './save-as-new-template-definition.interface';
import { ISliderFieldProps } from './slider-field-definition.interface';
import { ISliderProps } from './slider-definition.interface';
import { ISubHeaderLinkProps } from './sub-header-link-definition.interface';
import { ISubHeaderProps } from './sub-header-definition.interface';
import { ITemplateFieldProps } from './template-field-definition.interface';
import { ITextAreaProps } from './text-area-definition.interface';
import { IThumbProps } from './thumb-definition.interface';
import { ITitleProps } from './title-definition.interface';
import { RegexpEnum } from './regexp-definition.interface';

/**
 * @entity
 * @stable [09.09.2020]
 */
export interface ICurrencySettingsEntity {
  currency?: string;
  currencyValueTemplate?: string;
  fractionalFormatOptions?: Intl.NumberFormatOptions;
  integerFormatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  shortCurrency?: string;
}

/**
 * @default-entity
 * @stable [09.09.2020]
 */
export const DEFAULT_CURRENCY_SETTINGS_ENTITY = Object.freeze<ICurrencySettingsEntity>({
  currency: 'USD',
  currencyValueTemplate: '{value}, {shortCurrency}',  // {currency} | {shortCurrency}
  fractionalFormatOptions: {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  },
  integerFormatOptions: {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
  locale: 'en-US',
  shortCurrency: '$',
});

/**
 * @stable [25.12.2019]
 */
export interface IDateTimeSettingsEntity {
  currentDate?: Date;
  dateTimeFormat?: string;
  isoWeek?: boolean;
  maxDate?: Date;
  minDate?: Date;
  uiDateFormat?: string;
  uiDateMask?: (string|RegExp)[];
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
  isoWeek: true,
  maxDate: new Date('01/01/4000'),
  minDate: new Date('01/01/1900'),
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
 * @settings-entity
 * @stable [20.05.2020]
 */
export interface IElementsMarkersSettingsEntity {
  selectedElement?: string;
  stickyElement?: string;
}

/**
 * @default-entity
 * @stable [20.05.2020]
 */
export const DEFAULT_ELEMENTS_MARKERS_SETTINGS_ENTITY = Object.freeze<IElementsMarkersSettingsEntity>({
  selectedElement: ElementsMarkersEnum.SELECTED_ELEMENT_817ACCF6,
  stickyElement: ElementsMarkersEnum.STICKY_ELEMENT_275B4646,
});

/**
 * @entity
 * @stable [04.02.2020]
 */
export interface IComponentsSettingsEntity {
  baseSelect?: IBaseSelectProps;
  basicList?: IBasicListProps;
  button?: IButtonProps;
  chart?: IChartProps;
  defaultLayout?: IDefaultLayoutProps;
  dialog?: IDialogProps;
  drawer?: IDrawerProps;
  field?: IFieldProps;
  formLayout?: IFormLayoutProps;
  gridHead?: IGridHeadProps;
  gridRow?: IGridRowProps;
  header?: IHeaderProps;
  inlineOption?: IInlineOptionProps;
  listItem?: IListItemProps;
  main?: IMainProps;
  navigationList?: INavigationListProps;
  numberField?: INumberFieldProps;
  pageToolbar?: IPageToolbarProps;
  saveAsNewTemplate?: ISaveAsNewTemplateProps;
  slider?: ISliderProps;
  sliderField?: ISliderFieldProps;
  subHeader?: ISubHeaderProps;
  subHeaderLink?: ISubHeaderLinkProps;
  templateField?: ITemplateFieldProps;
  textarea?: ITextAreaProps;
  thumb?: IThumbProps;
  title?: ITitleProps;
}

/**
 * @default-entity
 * @stable [02.07.2021]
 */
export const DEFAULT_COMPONENTS_SETTINGS_ENTITY = Object.freeze<IComponentsSettingsEntity>({
  header: {navigationActionRendered: false},
  numberField: {pattern: RegexpEnum.NUMBER},
});

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IRoutesSettingsEntity {
  accessDenied?: string;
  help?: string;
  home?: string;
  logout?: string;
  oauthCallback?: string;
  oauthSignIn?: string;
  profile?: string;
  signIn?: string;
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
 * @entity
 * @stable [30.04.2021]
 */
export interface IChannelSettingsEntity {
  eventToEmit?: string;
  eventToListen?: string;
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
  regionCodeTemplate?: string,
  uiMask?: (string|RegExp)[];
}

/**
 * @stable [29.11.0219]
 */
export const DEFAULT_PHONE_SETTINGS_ENTITY = Object.freeze<IPhoneSettingsEntity>({
  countryAbbr: 'US',
  regionCodeTemplate: '+{value}',
  uiMask: [' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
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
  ACCEPT?: string;
  ADDRESS_SELECTION?: string;
  AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE?: string;
  APPLICATION_IS_INITIALIZING?: string;
  APPLY?: string;
  BUILD?: string;
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED?: string;
  CLEAR_ALL?: string;
  CLOSE?: string;
  COMPARE_TO?: string;
  CREATE?: string;
  CUSTOM?: string;
  DATA_HAS_BEEN_SAVED_SUCCESSFULLY?: string;
  DATE?: string;
  DAY?: string;
  DELETE?: string;
  DETAILS_INFO?: string;
  DIALOG_ACCEPT?: string;
  DIALOG_CANCEL?: string;
  DIALOG_DISCARD?: string;
  ENVIRONMENT?: string;
  ERROR?: string;
  EXPORT?: string;
  FILTERS?: string;
  FIRST?: string;
  HARDWARE_ERROR?: string;
  LAST?: string;
  LAST_MONTH?: string;
  LAST_QUARTER?: string;
  LAST_WEEK?: string;
  LAST_YEAR?: string;
  LOG_OUT?: string;
  MAX_LENGTH_OF?: string;
  NA?: string;
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED?: string;
  NEXT?: string;
  NO_AVAILABLE_ITEMS_TO_SELECT?: string;
  NO_DATA?: string;
  NOT_DATA_FOUND?: string;
  OK?: string;
  OVERWRITE_WITH_NEW_SETTINGS?: string;
  PAGES_INFO?: string;
  PASSWORD_MUST_CONTAIN_AT_LEAST_8_CHARACTERS?: string;
  PATH?: string;
  PLEASE_WAIT?: string;
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER?: string;
  PREVIEW?: string;
  PREVIOUS?: string;
  PUT_MARKER_HERE?: string;
  REFRESH?: string;
  RESET?: string;
  RESTART_APP?: string;
  RESTORE_SETTINGS?: string;
  SAVE?: string;
  SAVE_AS?: string;
  SAVE_AS_NEW?: string;
  SEARCH?: string;
  SETTINGS?: string;
  SHORT_PAGES_INFO?: string;
  SOMETHING_WENT_WRONG?: string;
  TAKE_SNAPSHOT?: string;
  THIS_MONTH?: string;
  THIS_QUARTER?: string;
  THIS_WEEK?: string;
  TODAY?: string;
  UNKNOWN_ERROR?: string;
  UPLOAD_FILES_HERE?: string;
  USER?: string;
  WAITING?: string;
  YEAR?: string;
  YESTERDAY?: string;
}

/**
 * @stable [07.10.2019]
 */
export const DEFAULT_MESSAGES_SETTINGS_ENTITY = Object.freeze<IMessagesSettingsEntity>({
  ACCEPT: 'Accept',
  ADDRESS_SELECTION: 'Address selection',
  AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE: 'An error occurred while loading the file',
  APPLICATION_IS_INITIALIZING: 'The app is initializing...',
  APPLY: 'Apply',
  BUILD: 'Build',
  CHANGES_YOU_MADE_WILL_NOT_BE_SAVED: 'Changes you made will not be saved',
  CLEAR_ALL: 'Clear all',
  CLOSE: 'Close',
  COMPARE_TO: 'Compare to',
  CREATE: 'Create',
  CUSTOM: 'Custom',
  DATA_HAS_BEEN_SAVED_SUCCESSFULLY: 'The data has been saved successfully',
  DATE: 'Date',
  DAY: 'Day',
  DELETE: 'Delete',
  DETAILS_INFO: 'Details info',
  DIALOG_ACCEPT: 'Continue',
  DIALOG_CANCEL: 'Cancel',
  DIALOG_DISCARD: 'Discard',
  ENVIRONMENT: 'Environment',
  ERROR: 'Error',
  EXPORT: 'Export',
  FILTERS: 'Filters',
  FIRST: 'First',
  HARDWARE_ERROR: 'Hardware error',
  LAST: 'Last',
  LAST_MONTH: 'Last month',
  LAST_QUARTER: 'Last quarter',
  LAST_WEEK: 'Last week',
  LAST_YEAR: 'Last year',
  LOG_OUT: 'Log out',
  MAX_LENGTH_OF: '{length} of {maxLength}',
  NA: 'N/A',
  NEW_APP_VERSION_HAS_BEEN_DEPLOYED: 'The app has been updated! Let\'s go to the main page',
  NEXT: 'Next',
  NO_AVAILABLE_ITEMS_TO_SELECT: 'No available items to select',
  NO_DATA: 'No data',
  NOT_DATA_FOUND: 'No data found',
  OK: 'Ok',
  OVERWRITE_WITH_NEW_SETTINGS: 'Overwrite with new settings',
  PAGES_INFO: '{from}-{to} of {count}',
  PASSWORD_MUST_CONTAIN_AT_LEAST_8_CHARACTERS: 'Password must contain at least 8 characters. Use at least one uppercase, one lowercase, one numeric, and one special character',
  PATH: 'Path',
  PLEASE_WAIT: 'Please wait...',
  PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER: 'Please send this screenshot to your support manager',
  PREVIEW: 'Preview',
  PREVIOUS: 'Previous',
  PUT_MARKER_HERE: 'Put marker here',
  REFRESH: 'Refresh',
  RESET: 'Reset',
  RESTART_APP: 'Restart App',
  RESTORE_SETTINGS: 'Restore settings',
  SAVE: 'Save',
  SAVE_AS: 'Save as',
  SAVE_AS_NEW: 'Save as new',
  SEARCH: 'Search',
  SETTINGS: 'Settings',
  SHORT_PAGES_INFO: 'Page {page} of {count}',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  TAKE_SNAPSHOT: 'Take a snapshot',
  THIS_MONTH: 'This month',
  THIS_QUARTER: 'This quarter',
  THIS_WEEK: 'This week',
  TODAY: 'Today',
  UNKNOWN_ERROR: 'Unknown error',
  UPLOAD_FILES_HERE: 'Upload a file(s) here',
  USER: 'User',
  WAITING: 'Waiting...',
  YEAR: 'Year',
  YESTERDAY: 'Yesterday',
});

/**
 * @entity
 * @stable [09.09.2020]
 */
export interface INumberConverterSettingsEntity {
  na?: string;
}

/**
 * @default-entity
 * @stable [06.02.2020]
 */
export const DEFAULT_NUMBER_CONVERTER_SETTINGS_ENTITY = Object.freeze<INumberConverterSettingsEntity>({
  na: DEFAULT_MESSAGES_SETTINGS_ENTITY.NA,
});
