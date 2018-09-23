import { ENV } from '../env';
import { ApplicationStorageTypeEnum } from '../storage';
import { AnyT } from '../definitions.interface';
import { prepareUrl } from '../util/url';

export interface IApplicationCurrencySettings {
  uiLocale?: string;
  uiCurrency?: string;
}

export interface IApplicationDateTimeSettings {
  currentDate?: Date;        // Current date
  timeZone?: string;         // Time zone (+08:00, etc..)
  dateFormat?: string;       // Client-server communication format
  timeFormat?: string;       // Client-server communication format
  dateTimeFormat?: string;   // Client-server communication format
  uiDateFormat?: string;     // UI format
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

export interface IApplicationMessagesSettings {
  newAppVersionMessageHasBeenDeployed?: string;
  dialogTitleMessage?: string;
  dialogCancelMessage?: string;
  dialogAcceptMessage?: string;
  logoutNotificationMessage?: string;
  accessDeniedMessage?: string;
  sorryMessage?: string;
  waitMessage?: string;
  waitingMessage?: string;
  defaultErrorMessage?: string;
  dataSaved?: string;
  dndMessage?: string;
  errorMessage?: string;
  fileLoadErrorMessage?: string;
  noFileToShowMessage?: string;
  serviceTemporarilyUnavailableMessage?: string;
  noAvailableItemsToSelectMessage?: string;
  emptyMessage?: string;
  emptyDataMessage?: string;
  appNotReadyMessage?: string;
  followingErrorHasOccurredMessage?: string;
  noSelectedItemsMessage?: string;
  filterPlaceholderMessage?: string;
  takeSnapshotMessage?: string;
  confirmationMessage?: string;
  continueMessage?: string;
  acceptMessage?: string;
  closeMessage?: string;
  previewMessage?: string;
  addressSelectionMessage?: string;
  putMarkerHereMessage?: string;
  invalidAddressMessage?: string;
  signIntoYourAccountMessage?: string;
  welcomeMessage?: string;
}

export interface IApplicationAuthorizationSettings {
  isAuthorizationNeeded?: boolean;
}

export interface IApplicationChannelSettings {
  eventToListen?: string;
  eventToEmit?: string;
}

export interface IApplicationGoogleMapsSettings {
  lat?: number;
  lng?: number;
  zoom?: number;
  prettyZoom?: number;
}

export interface IApplicationSettings {
  apiUrl?: string;
  binaryUrl?: string;
  downloadUrl?: string;
  metaFilesJsonUrl?: string;
  pdfWorkerDirectoryUrl?: string;
  emptyPictureUrl?: string;
  companyName?: string;
  companyCountry?: string;
  usePersistence?: boolean;
  persistenceStorage?: ApplicationStorageTypeEnum;
  entityEmptyId?: AnyT;
  dateTime?: IApplicationDateTimeSettings;
  phone?: IApplicationPhoneSettings;
  currency?: IApplicationCurrencySettings;
  number?: IApplicationNumberSettings;
  messages?: IApplicationMessagesSettings;
  channel?: IApplicationChannelSettings;
  authorization?: IApplicationAuthorizationSettings;
  googleMaps?: IApplicationGoogleMapsSettings;
}

export const REGEXP_REPO = {
  price: '\\d+(\\.\\d{1,2})?',
  number: '[-+]?[0-9]*[.,]?[0-9]+',
  digital: '[0-9]+',
};

export const DEFAULT_APPLICATION_SETTINGS: IApplicationSettings = {
  usePersistence: true,
  apiUrl: prepareUrl(ENV.basePath + '/api/'),
  binaryUrl: prepareUrl(ENV.basePath + '/api/blobs/upload/'),
  downloadUrl: prepareUrl(ENV.basePath + '/api/download/?params='),
  emptyPictureUrl: 'media/no_avatar.jpg',
  companyName: 'Test company',
  entityEmptyId: null,
  messages: {
    newAppVersionMessageHasBeenDeployed: 'A new app version has been deployed. Need to go to the home page.',
    dialogTitleMessage: 'Notice',
    dialogCancelMessage: 'Cancel',
    dialogAcceptMessage: 'Continue',
    logoutNotificationMessage: 'You were logged out.',
    accessDeniedMessage: 'The access is restricted for you.',
    sorryMessage: 'Sorry about that.',
    waitMessage: 'Please wait...',
    waitingMessage: 'Waiting...',
    defaultErrorMessage: 'Error',
    dataSaved: 'The data has been successfully saved.',
    dndMessage: 'Upload a file(s) here',
    serviceTemporarilyUnavailableMessage: 'Service temporarily unavailable. Please try later.',
    noAvailableItemsToSelectMessage: 'No available items to select.',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    fileLoadErrorMessage: 'Can\'t load the file.',
    noFileToShowMessage: 'No file to show.',
    emptyMessage: 'Start a search',
    emptyDataMessage: 'No data found',
    appNotReadyMessage: 'The application is initialized...',
    followingErrorHasOccurredMessage: 'The following error has occurred:',
    noSelectedItemsMessage: 'No selected items.',
    filterPlaceholderMessage: 'Filter',
    takeSnapshotMessage: 'Take a snapshot',
    confirmationMessage: 'Confirmation',
    continueMessage: 'Continue',
    acceptMessage: 'Accept',
    closeMessage: 'Close',
    previewMessage: 'Preview',
    addressSelectionMessage: 'Address selection',
    putMarkerHereMessage: 'Put marker here',
    invalidAddressMessage: 'Invalid address',
  },
  dateTime: {
    currentDate: new Date(),
    dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    uiDateFormat: 'YYYY-MM-DD',
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
    uiPattern: '1[0-9]{10}',
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
  },
};
