import { ENV } from '../env';
import { AnyT } from '../definitions.interface';
import { prepareUrl } from '../util';
import { StorageTypeEnum } from '../storage/storage.interface';
import { IBaseTransportRequestEntity } from '../entities-definitions.interface';
import { IButtonProps } from '../definition';

export interface IApplicationCurrencySettings {
  uiLocale?: string;
  uiCurrency?: string;
}

export interface IApplicationResourcePaths {
  uiDefaultIconPath?: string;
}

/**
 * @stable [02.02.2019]
 */
export interface ITransportSettings extends IBaseTransportRequestEntity {
  binaryContentType?: string;
  formDataContentType?: string;
  binaryUrl?: string;
  apiUrl?: string;
  noCachePrefix?: string;
}

export enum StartDayOfWeekT {
  MONDAY,
  SUNDAY,
}

export interface IDateTimeSettings {
  startDayOfWeek?: StartDayOfWeekT;
  currentDate?: Date;        // Current date
  timeZone?: string;         // Time zone (+08:00, etc..)
  dateFormat?: string;       // Client-server communication format
  timeFormat?: string;       // Client-server communication format
  dateTimeFormat?: string;   // Client-server communication format
  uiDateFormat?: string;     // UI format
  uiMonthFormat?: string;    // UI format
  uiTimeFormat?: string;     // UI format
  pstDateFormat?: string;                 // UI PST format
  pstTimeFormat?: string;                 // UI PST format
  uiDateMask?: Array<string|RegExp>;      // UI mask
  uiTimeMask?: Array<string|RegExp>;      // UI mask
  uiShortTimeMask?: Array<string|RegExp>; // UI mask
  uiDatePattern?: string;                 // UI pattern
  uiTimePattern?: string;                 // UI pattern
  uiShortTimePattern?: string;            // UI pattern
}

export interface IApplicationPhoneSettings {
  uiPattern?: string;
  uiMask?: Array<string|RegExp>;
  uiCountryAbbreviation?: string;
}

export interface IApplicationNumberSettings {
  uiPattern?: string;
}

/**
 * @stable [10.03.2019]
 */
export interface IMessagesSettings {
  acceptMessage?: string;
  accessDeniedMessage?: string;
  addressSelectionMessage?: string;
  applyMessage?: string;
  appNotReadyMessage?: string;
  clearAllMessage?: string;
  closeMessage?: string;
  confirmationMessage?: string;
  continueMessage?: string;
  create?: string;
  dataSaved?: string;
  defaultErrorMessage?: string;
  dialogAcceptMessage?: string;
  dialogCancelMessage?: string;
  dialogTitleMessage?: string;
  dndMessage?: string;
  emptyDataMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  exportActionTitleMessage?: string;
  fileLoadErrorMessage?: string;
  filterPlaceholderMessage?: string;
  filtersMessage?: string;
  followingErrorHasOccurredMessage?: string;
  invalidAddressMessage?: string;
  logOutMessage?: string;
  logoutNotificationMessage?: string;
  newAppVersionMessageHasBeenDeployed?: string;
  noAvailableItemsToSelectMessage?: string;
  noItemsMessage?: string;
  pagesMessage?: string;
  previewMessage?: string;
  putMarkerHereMessage?: string;
  refreshActionTitleMessage?: string;
  requestCancelErrorMessage?: string;
  reset?: string;
  save?: string;
  serviceTemporarilyUnavailableMessage?: string;
  settingsMessage?: string;
  simplePagesMessage?: string;
  sorryMessage?: string;
  takeSnapshotMessage?: string;
  unknownFileMessage?: string;
  waitingMessage?: string;
  waitMessage?: string;
  welcomeMessage?: string;
  yearMessage?: string;
}

export interface IApplicationAuthorizationSettings {
  isAuthorizationNeeded?: boolean;
}

export interface IApplicationChannelSettings {
  eventToListen?: string;
  eventToEmit?: string;
}

export interface IGoogleMapsSettings {
  lat?: number;
  lng?: number;
  zoom?: number;
  prettyZoom?: number;
  libraries?: string;
}

export interface IComponentsSettings {
  button?: IButtonProps;
}

export interface ISettings {
  signalRUrl?: string;
  downloadUrl?: string;
  metaFilesJsonUrl?: string;
  pdfWorkerDirectoryUrl?: string;
  emptyPictureUrl?: string;
  companyName?: string;
  companyCountry?: string;
  usePersistence?: boolean;
  transport?: ITransportSettings;
  persistenceStorage?: StorageTypeEnum;
  entityEmptyId?: AnyT;
  resourcePaths?: IApplicationResourcePaths;
  dateTime?: IDateTimeSettings;
  phone?: IApplicationPhoneSettings;
  currency?: IApplicationCurrencySettings;
  number?: IApplicationNumberSettings;
  messages?: IMessagesSettings;
  channel?: IApplicationChannelSettings;
  authorization?: IApplicationAuthorizationSettings;
  googleMaps?: IGoogleMapsSettings;
  components?: IComponentsSettings;
}

export const REGEXP_REPO = {
  price: '\\d+(\\.\\d{1,2})?',
  number: '[-+]?[0-9]*[.,]?[0-9]+',
  digital: '[0-9]+',
};

export const DEFAULT_APPLICATION_SETTINGS: ISettings = {
  usePersistence: true,
  signalRUrl: prepareUrl(ENV.basePath + '/api/'),
  downloadUrl: prepareUrl(ENV.basePath + '/api/download/?params='),
  emptyPictureUrl: 'media/no_avatar.jpg',
  companyName: 'Test company',
  entityEmptyId: null,
  transport: {
    method: 'post',
    withCredentials: true,
    binaryContentType: 'application/octet-stream',
    formDataContentType: 'multipart/form-data',
    apiUrl: prepareUrl(ENV.basePath + '/api/'),
    binaryUrl: prepareUrl(ENV.basePath + '/api/blobs/upload/'),
    noCachePrefix: '_dc',
  },
  messages: {
    acceptMessage: 'Accept',
    accessDeniedMessage: 'The access is restricted for you.',
    addressSelectionMessage: 'Address selection',
    applyMessage: 'Apply',
    appNotReadyMessage: 'The application is initialized...',
    clearAllMessage: 'Clear all',
    closeMessage: 'Close',
    confirmationMessage: 'Confirmation',
    continueMessage: 'Continue',
    create: 'Create',
    dataSaved: 'The data has been successfully saved.',
    defaultErrorMessage: 'Error',
    dialogAcceptMessage: 'Continue',
    dialogCancelMessage: 'Cancel',
    dialogTitleMessage: 'Notice',
    dndMessage: 'Upload a file(s) here',
    emptyDataMessage: 'No data found',
    emptyMessage: 'Start a search',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    exportActionTitleMessage: 'Export',
    fileLoadErrorMessage: 'Can\'t load the file.',
    filterPlaceholderMessage: 'Filter',
    filtersMessage: 'Filters',
    followingErrorHasOccurredMessage: 'The following error has occurred:',
    invalidAddressMessage: 'Invalid address',
    logOutMessage: 'Log out',
    logoutNotificationMessage: 'You were logged out.',
    newAppVersionMessageHasBeenDeployed: 'A new app version has been deployed. Need to go to the home page.',
    noAvailableItemsToSelectMessage: 'No available items to select.',
    noItemsMessage: 'No items.',
    pagesMessage: '{from}-{to} of {count}',
    previewMessage: 'Preview',
    putMarkerHereMessage: 'Put marker here',
    refreshActionTitleMessage: 'Refresh',
    requestCancelErrorMessage: 'The request has been canceled by the user.',
    reset: 'Reset',
    save: 'Save',
    serviceTemporarilyUnavailableMessage: 'Service temporarily unavailable. Please try later.',
    settingsMessage: 'Settings',
    simplePagesMessage: 'Page {page} of {count}',
    sorryMessage: 'Sorry about that.',
    takeSnapshotMessage: 'Take a snapshot',
    unknownFileMessage: 'Unknown file',
    waitingMessage: 'Waiting...',
    waitMessage: 'Please wait...',
    yearMessage: 'Year',
  },
  dateTime: {
    startDayOfWeek: StartDayOfWeekT.MONDAY,
    currentDate: new Date(),
    dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    uiDateFormat: 'YYYY-MM-DD',
    uiMonthFormat: 'YYYY-MM',
    uiTimeFormat: 'HH:mm:ss',
    pstTimeFormat: 'hh:mm A',
    pstDateFormat: 'MMM DD',
    uiDateMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    uiTimeMask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    uiShortTimeMask: [/\d/, /\d/, ':', /\d/, /\d/],
    uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
    uiTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
    uiShortTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9])',
  },
  number: {
    uiPattern: REGEXP_REPO.number,
  },
  phone: {
    uiPattern: '[0-9]{11}',
    uiMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    uiCountryAbbreviation: 'US',
  },
  currency: {
    uiLocale: 'en-US',
    uiCurrency: 'USD',
  },
  channel: {
    eventToListen: 'client-event-to-listen',
    eventToEmit: 'client-event-to-emit',
  },
  authorization: {
    isAuthorizationNeeded: true,
  },
  googleMaps: {
    lat: 34.0522,
    lng: -118.2436,
    zoom: 13,
    prettyZoom: 17,
    libraries: 'places,visualization',
  },
};
