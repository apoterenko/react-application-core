import { ENV } from '../env';
import { prepareUrl } from '../util';
import {
  DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY,
  DEFAULT_COMPONENTS_SETTINGS_ENTITY,
  DEFAULT_CURRENCY_SETTINGS_ENTITY,
  DEFAULT_DATE_TIME_SETTINGS_ENTITY,
  DEFAULT_GOOGLE_MAPS_SETTINGS_ENTITY,
  DEFAULT_MESSAGES_SETTINGS_ENTITY,
  DEFAULT_OAUTH_SETTINGS_ENTITY,
  DEFAULT_PHONE_SETTINGS_ENTITY,
  DEFAULT_ROUTES_SETTINGS_ENTITY,
  DEFAULT_STORAGE_SETTINGS_ENTITY,
  DEFAULT_URLS_SETTINGS_ENTITY,
  IAsyncLibrariesSettingsEntity,
  IComponentsSettingsEntity,
  ICurrencySettingsEntity,
  IDateTimeSettingsEntity,
  IGoogleMapsSettingsEntity,
  IMessagesSettingsEntity,
  IOAuthSettingsEntity,
  IPhoneSettingsEntity,
  IRoutesSettingsEntity,
  IStorageSettingsEntity,
  ITransportSettingsEntity,
  IUrlsSettingsEntity,
  RegexpEnum,
  StorageTypesEnum,
} from '../definition';

export interface IApplicationResourcePaths {
  uiDefaultIconPath?: string;
}

export interface IDateTimeSettings extends IDateTimeSettingsEntity {
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
  appNotReadyMessage?: string;
  confirmationMessage?: string;
  continueMessage?: string;
  dataSaved?: string;
  dialogTitleMessage?: string;
  dndMessage?: string;
  emptyDataMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  invalidAddressMessage?: string;
  logoutNotificationMessage?: string;
  noItemsMessage?: string;
  requestCancelErrorMessage?: string;
  serviceTemporarilyUnavailableMessage?: string;
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

export interface IBootstrapSettings {
  flexEnabled?: boolean;
  rootId?: string;
}

export interface ISettingsEntity {
  asyncLibraries?: IAsyncLibrariesSettingsEntity;
  authorization?: IAuthorizationSettings;
  bootstrap?: IBootstrapSettings;
  channel?: IApplicationChannelSettings;
  companyName?: string;
  components?: IComponentsSettingsEntity;
  currency?: ICurrencySettingsEntity;
  dateTime?: IDateTimeSettings;
  downloadUrl?: string;
  emptyPictureUrl?: string;
  googleMaps?: IGoogleMapsSettingsEntity;
  messages?: IMessagesSettings;
  metaFilesUrl?: string;
  number?: IApplicationNumberSettings;
  oauth?: IOAuthSettingsEntity;
  persistenceStorage?: StorageTypesEnum;
  phone?: IPhoneSettingsEntity;
  resourcePaths?: IApplicationResourcePaths;
  routes?: IRoutesSettingsEntity;
  signalRUrl?: string;
  storage?: IStorageSettingsEntity;
  transport?: ITransportSettingsEntity;
  urls?: IUrlsSettingsEntity;
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
    blobUrl: prepareUrl(ENV.basePath + '/api/blobs/upload/'),
    uniqueParamName: '_dc',
  },
  messages: {
    ...DEFAULT_MESSAGES_SETTINGS_ENTITY,
    acceptMessage: 'Accept',
    accessDeniedMessage: 'The access is restricted for you.',
    appNotReadyMessage: 'App is being initialized...',
    confirmationMessage: 'Confirmation',
    continueMessage: 'Continue',
    dataSaved: 'The data has been successfully saved.',
    dialogTitleMessage: 'Notice',
    dndMessage: 'Upload a file(s) here',
    emptyDataMessage: 'No data found',
    emptyMessage: 'Start a search',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    invalidAddressMessage: 'Invalid address',
    logoutNotificationMessage: 'You were logged out.',
    noItemsMessage: 'No items.',
    requestCancelErrorMessage: 'The request has been canceled by the user.',
    serviceTemporarilyUnavailableMessage: 'Service temporarily unavailable. Please try later.',
    sorryMessage: 'Sorry about that.',
    takeSnapshotMessage: 'Take a snapshot',
    unknownFileMessage: 'Unknown file',
    waitingMessage: 'Waiting...',
    waitMessage: 'Please wait...',
    yearMessage: 'Year',
  },
  oauth: DEFAULT_OAUTH_SETTINGS_ENTITY,
  routes: DEFAULT_ROUTES_SETTINGS_ENTITY,
  asyncLibraries: DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY,
  dateTime: {
    ...DEFAULT_DATE_TIME_SETTINGS_ENTITY,
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
  components: DEFAULT_COMPONENTS_SETTINGS_ENTITY,
  channel: {
    eventToListen: 'client-event-to-listen',
    eventToEmit: 'client-event-to-emit',
  },
  authorization: {
    isAuthorizationNeeded: true,
  },
  googleMaps: DEFAULT_GOOGLE_MAPS_SETTINGS_ENTITY,
  urls: DEFAULT_URLS_SETTINGS_ENTITY,
};

// TODO Remove duplication
Reflect.defineProperty(DEFAULT_APPLICATION_SETTINGS.dateTime, 'currentDate', {
  get: () => new Date(),    // To prevent 24h caching
});
