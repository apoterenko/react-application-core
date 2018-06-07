import { BASE_PATH } from '../env';
import { ApplicationStorageTypeEnum } from '../storage';
import { AnyT } from '../definitions.interface';

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
  pstDateFormat?: string;                // UI PST format
  pstTimeFormat?: string;                // UI PST format
  uiDateMask?: Array<string|RegExp>;     // UI mask
  uiTimeMask?: Array<string|RegExp>;     // UI mask
  uiDatePattern?: string;                // UI pattern
  uiTimePattern?: string;                // UI pattern
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
  dialogTitleMessage?: string;
  dialogCancelMessage?: string;
  dialogAcceptMessage?: string;
  logoutNotificationMessage?: string;
  accessDeniedMessage?: string;
  sorryMessage?: string;
  waitMessage?: string;
  waitingMessage?: string;
  defaultErrorMessage?: string;
  dndMessage?: string;
  errorMessage?: string;
  serviceTemporarilyUnavailableMessage?: string;
  noAvailableItemsToSelectMessage?: string;
  emptyMessage?: string;
  emptyDataMessage?: string;
  appNotReadyMessage?: string;
  followingErrorHasOccurredMessage?: string;
  noSelectedItems?: string;
  filterPlaceholderMessage?: string;
}

export interface IApplicationAuthorizationSettings {
  isAuthorizationNeeded?: boolean;
}

export interface IApplicationChannelSettings {
  eventToListen?: string;
  eventToEmit?: string;
}

export interface IApplicationSettings {
  apiUrl?: string;
  binaryUrl?: string;
  companyName?: string;
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
}

export const REGEXP_REPO = {
  price: '\\d+(\\.\\d{1,2})?',
  number: '[-+]?[0-9]*[.,]?[0-9]+',
};

export const prepareUrl = (url) => url.replace(/(\/\/)+/, '/');

export const DEFAULT_APPLICATION_SETTINGS: IApplicationSettings = {
  usePersistence: true,
  apiUrl: prepareUrl(BASE_PATH + '/api/'),
  binaryUrl: prepareUrl(BASE_PATH + '/api/blobs/upload/'),
  companyName: 'Test company',
  entityEmptyId: null,
  messages: {
    dialogTitleMessage: 'Notice',
    dialogCancelMessage: 'Cancel',
    dialogAcceptMessage: 'Continue',
    logoutNotificationMessage: 'You were logged out.',
    accessDeniedMessage: 'The access is restricted for you.',
    sorryMessage: 'Sorry about that.',
    waitMessage: 'Please wait...',
    waitingMessage: 'Waiting...',
    defaultErrorMessage: 'Error',
    dndMessage: 'Try dropping some file(s) here, or click to select file(s) to upload.',
    serviceTemporarilyUnavailableMessage: 'Service temporarily unavailable. Please try later.',
    noAvailableItemsToSelectMessage: 'No available items to select.',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    emptyMessage: 'Start a search',
    emptyDataMessage: 'No data found',
    appNotReadyMessage: 'The application is not ready.',
    followingErrorHasOccurredMessage: 'The following error has occurred:',
    noSelectedItems: 'No selected items',
    filterPlaceholderMessage: 'Filter',
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
    uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
    uiTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
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
};
