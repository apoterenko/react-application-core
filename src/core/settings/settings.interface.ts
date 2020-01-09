import { ENV } from '../env';
import { prepareUrl } from '../util';
import {
  DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY,
  DEFAULT_CURRENCY_SETTINGS_ENTITY,
  DEFAULT_DATE_TIME_SETTINGS_ENTITY,
  DEFAULT_MESSAGES_SETTINGS_ENTITY,
  DEFAULT_PHONE_SETTINGS_ENTITY,
  DEFAULT_STORAGE_SETTINGS_ENTITY,
  IAsyncLibrariesSettingsEntity,
  IButtonProps,
  ICurrencySettingsEntity,
  IDateTimeSettingsEntity,
  IMessagesSettingsEntity,
  IPhoneSettingsEntity,
  IStorageSettingsEntity,
  ITransportSettingsEntity,
  RegexpEnum,
  StorageTypesEnum,
} from '../definition';

export interface IApplicationResourcePaths {
  uiDefaultIconPath?: string;
}

export enum StartDayOfWeekT {
  MONDAY,
  SUNDAY,
}

export interface IDateTimeSettings extends IDateTimeSettingsEntity {
  startDayOfWeek?: StartDayOfWeekT;
  timeZone?: string;         // Time zone (+08:00, etc..)
  dateFormat?: string;       // Client-server communication format
  timeFormat?: string;       // Client-server communication format
  uiMonthFormat?: string;    // UI format
  pstDateFormat?: string;                 // UI PST format
  pstTimeFormat?: string;                 // UI PST format
  uiTimeMask?: Array<string|RegExp>;      // UI mask
  uiShortTimeMask?: Array<string|RegExp>; // UI mask
  uiTimePattern?: string;                 // UI pattern
  uiShortTimePattern?: string;            // UI pattern
}

export interface IApplicationNumberSettings {
  uiPattern?: string;
}

/**
 * @stable [10.03.2019]
 */
export interface IMessagesSettings extends IMessagesSettingsEntity {
  acceptMessage?: string;
  accessDeniedMessage?: string;
  applyMessage?: string;
  appNotReadyMessage?: string;
  clearAllMessage?: string;
  closeMessage?: string;
  confirmationMessage?: string;
  continueMessage?: string;
  create?: string;
  dataSaved?: string;
  defaultErrorMessage?: string;
  dialogTitleMessage?: string;
  dndMessage?: string;
  emptyDataMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  exportActionTitleMessage?: string;
  fileLoadErrorMessage?: string;
  filtersMessage?: string;
  invalidAddressMessage?: string;
  logOutMessage?: string;
  logoutNotificationMessage?: string;
  noAvailableItemsToSelectMessage?: string;
  noItemsMessage?: string;
  pagesMessage?: string;
  previewMessage?: string;
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

export interface IAuthorizationSettings {
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

export interface IBootstrapSettings {
  flexEnabled?: boolean;
  rootId?: string;
}

export interface ISettingsEntity {
  asyncLibraries?: IAsyncLibrariesSettingsEntity;
  authorization?: IAuthorizationSettings;
  bootstrap?: IBootstrapSettings;
  channel?: IApplicationChannelSettings;
  companyCountry?: string;
  companyName?: string;
  components?: IComponentsSettings;
  currency?: ICurrencySettingsEntity;
  dateTime?: IDateTimeSettings;
  downloadUrl?: string;
  emptyPictureUrl?: string;
  googleMaps?: IGoogleMapsSettings;
  messages?: IMessagesSettings;
  metaFilesUrl?: string;
  number?: IApplicationNumberSettings;
  pdfWorkerDirectoryUrl?: string;
  persistenceStorage?: StorageTypesEnum;
  phone?: IPhoneSettingsEntity;
  resourcePaths?: IApplicationResourcePaths;
  signalRUrl?: string;
  storage?: IStorageSettingsEntity;
  transport?: ITransportSettingsEntity;
}

export const DEFAULT_APPLICATION_SETTINGS: ISettingsEntity = {
  signalRUrl: prepareUrl(ENV.basePath + '/api/'),
  downloadUrl: prepareUrl(ENV.basePath + '/api/download/?params='),
  emptyPictureUrl: 'media/no_avatar.jpg',
  companyName: 'Test company',
  transport: {
    method: 'post',
    withCredentials: true,
    blobDataContentType: 'application/octet-stream',
    formDataContentType: 'multipart/form-data',
    apiUrl: prepareUrl(ENV.basePath + '/api/'),
    uploadUrl: prepareUrl(ENV.basePath + '/api/blobs/upload/'),
    uniqueParamName: '_dc',
  },
  messages: {
    ...DEFAULT_MESSAGES_SETTINGS_ENTITY,
    acceptMessage: 'Accept',
    accessDeniedMessage: 'The access is restricted for you.',
    applyMessage: 'Apply',
    appNotReadyMessage: 'App is being initialized...',
    clearAllMessage: 'Clear all',
    closeMessage: 'Close',
    confirmationMessage: 'Confirmation',
    continueMessage: 'Continue',
    create: 'Create',
    dataSaved: 'The data has been successfully saved.',
    defaultErrorMessage: 'Error',
    dialogTitleMessage: 'Notice',
    dndMessage: 'Upload a file(s) here',
    emptyDataMessage: 'No data found',
    emptyMessage: 'Start a search',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    exportActionTitleMessage: 'Export',
    fileLoadErrorMessage: 'Can\'t load the file.',
    filtersMessage: 'Filters',
    invalidAddressMessage: 'Invalid address',
    logOutMessage: 'Log out',
    logoutNotificationMessage: 'You were logged out.',
    noAvailableItemsToSelectMessage: 'No available items to select.',
    noItemsMessage: 'No items.',
    pagesMessage: '{from}-{to} of {count}',
    previewMessage: 'Preview',
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
  asyncLibraries: DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY,
  dateTime: {
    ...DEFAULT_DATE_TIME_SETTINGS_ENTITY,
    startDayOfWeek: StartDayOfWeekT.MONDAY,
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    uiMonthFormat: 'YYYY-MM',
    pstTimeFormat: 'hh:mm A',
    pstDateFormat: 'MMM DD',
    uiTimeMask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    uiShortTimeMask: [/\d/, /\d/, ':', /\d/, /\d/],
    uiTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
    uiShortTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9])',
  },
  bootstrap: {
    rootId: 'appId',
  },
  number: {
    uiPattern: RegexpEnum.NUMBER,
  },
  phone: DEFAULT_PHONE_SETTINGS_ENTITY,
  storage: DEFAULT_STORAGE_SETTINGS_ENTITY,
  currency: DEFAULT_CURRENCY_SETTINGS_ENTITY,
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

// TODO Remove duplication
Reflect.defineProperty(DEFAULT_APPLICATION_SETTINGS.dateTime, 'currentDate', {
  get: () => new Date(),    // To prevent 24h caching
});
