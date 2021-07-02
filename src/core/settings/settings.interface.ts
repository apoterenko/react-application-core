import { prepareUrl } from '../util';
import {
  DEFAULT_ASYNC_LIBRARIES_SETTINGS_ENTITY,
  DEFAULT_DATE_TIME_SETTINGS_ENTITY,
  DEFAULT_ELEMENTS_MARKERS_SETTINGS_ENTITY,
  DEFAULT_GOOGLE_MAPS_SETTINGS_ENTITY,
  DEFAULT_MESSAGES_SETTINGS_ENTITY,
  DEFAULT_OAUTH_SETTINGS_ENTITY,
  DEFAULT_PHONE_SETTINGS_ENTITY,
  DEFAULT_ROUTES_SETTINGS_ENTITY,
  DEFAULT_STORAGE_SETTINGS_ENTITY,
  DEFAULT_URLS_SETTINGS_ENTITY,
  DefaultEntities,
  IAsyncLibrariesSettingsEntity,
  IChannelSettingsEntity,
  IComponentsSettingsEntity,
  ICurrencySettingsEntity,
  IDateTimeSettingsEntity,
  IElementsMarkersSettingsEntity,
  IGoogleMapsSettingsEntity,
  IMessagesSettingsEntity,
  INumberConverterSettingsEntity,
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
  uiTimeMask?: (string|RegExp)[];         // UI mask
  uiShortTimeMask?: (string|RegExp)[];    // UI mask
  uiTimePattern?: string;                 // UI pattern
  uiShortTimePattern?: string;            // UI pattern
}

/**
 * @stable [10.03.2019]
 */
export interface IMessagesSettings extends IMessagesSettingsEntity {
  acceptMessage?: string;
  accessDeniedMessage?: string;
  dataSaved?: string;
  emptyMessage?: string;
  errorMessage?: string;
  logoutNotificationMessage?: string;
  noItemsMessage?: string;
  requestCancelErrorMessage?: string;
  serviceTemporarilyUnavailableMessage?: string;
  sorryMessage?: string;
  waitMessage?: string;
}

export interface IAuthorizationSettings {
  isAuthorizationNeeded?: boolean;
}

export interface IBootstrapSettings {
  flexEnabled?: boolean;
  rootId?: string;
}

export interface ISettingsEntity {
  asyncLibraries?: IAsyncLibrariesSettingsEntity;
  authorization?: IAuthorizationSettings;
  bootstrap?: IBootstrapSettings;
  channel?: IChannelSettingsEntity;
  companyName?: string;
  components?: IComponentsSettingsEntity;
  currency?: ICurrencySettingsEntity;
  dateTime?: IDateTimeSettings;
  downloadUrl?: string;
  elementsMarkers?: IElementsMarkersSettingsEntity;
  emptyPictureUrl?: string;
  googleMaps?: IGoogleMapsSettingsEntity;
  locale?: string;
  messages?: IMessagesSettings;
  metaFilesUrl?: string;
  numberConverter?: INumberConverterSettingsEntity;
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
  signalRUrl: prepareUrl(DefaultEntities.ENVIRONMENT_ENTITY.basePath + '/api/'),
  downloadUrl: prepareUrl(DefaultEntities.ENVIRONMENT_ENTITY.basePath + '/api/download/?params='),
  emptyPictureUrl: 'media/no_avatar.jpg',
  companyName: 'Test company',
  transport: {
    method: 'post',
    withCredentials: true,
    blobDataContentType: 'application/octet-stream',
    formDataContentType: 'multipart/form-data',
    apiUrl: prepareUrl(DefaultEntities.ENVIRONMENT_ENTITY.basePath + '/api/'),
    blobUrl: prepareUrl(DefaultEntities.ENVIRONMENT_ENTITY.basePath + '/api/blobs/upload/'),
    uniqueParamName: '_dc',
  },
  messages: {
    ...DEFAULT_MESSAGES_SETTINGS_ENTITY,
    acceptMessage: 'Accept',
    accessDeniedMessage: 'The access is restricted for you.',
    dataSaved: 'The data has been successfully saved.',
    emptyMessage: 'Start a search',
    errorMessage: 'Something went wrong. There was a problem loading your data',
    logoutNotificationMessage: 'You were logged out.',
    noItemsMessage: 'No items.',
    requestCancelErrorMessage: 'The request has been canceled by the user.',
    serviceTemporarilyUnavailableMessage: 'Service temporarily unavailable. Please try later.',
    sorryMessage: 'Sorry about that.',
    waitMessage: 'Please wait...',
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
  bootstrap: {rootId: 'appId'},
  components: DefaultEntities.COMPONENTS_SETTINGS_ENTITY,
  currency: DefaultEntities.CURRENCY_SETTINGS_ENTITY,
  elementsMarkers: DEFAULT_ELEMENTS_MARKERS_SETTINGS_ENTITY,
  numberConverter: DefaultEntities.NUMBER_CONVERTER_SETTINGS_ENTITY,
  phone: DEFAULT_PHONE_SETTINGS_ENTITY,
  storage: DEFAULT_STORAGE_SETTINGS_ENTITY,
  channel: {
    eventToListen: 'client-event-to-listen',
    eventToEmit: 'client-event-to-emit',
  },
  authorization: {isAuthorizationNeeded: true},
  googleMaps: DEFAULT_GOOGLE_MAPS_SETTINGS_ENTITY,
  locale: DefaultEntities.LOCALE,
  urls: DEFAULT_URLS_SETTINGS_ENTITY,
};

// TODO Remove duplication
Reflect.defineProperty(DEFAULT_APPLICATION_SETTINGS.dateTime, 'currentDate', {
  get: () => new Date(),    // To prevent 24h caching
});
