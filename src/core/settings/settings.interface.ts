import { BASE_PATH } from '../env';
import { ApplicationStorageTypeEnum } from '../storage';

export interface IApplicationCurrencySettings {
  uiLocale?: string;
  uiCurrency?: string;
}

export interface IApplicationDateTimeSettings {
  dateTimeFormat?: string;   // Client-server communication format
  dateFormat?: string;       // Client-server communication format
  uiDateFormat?: string;     // UI format
  uiTimeFormat?: string;     // UI format
  pstDateFormat?: string;                // UI PST date format
  pstTimeFormat?: string;                // UI PST time format
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

export interface IApplicationMessages {
  logoutNotificationMessage?: string;
  accessDeniedMessage?: string;
  sorryMessage?: string;
}

export interface IApplicationSettings {
  apiUrl?: string;
  companyName?: string;
  usePersistence?: boolean;
  persistenceStorage?: ApplicationStorageTypeEnum;
  dateTimeSettings?: IApplicationDateTimeSettings;
  phoneSettings?: IApplicationPhoneSettings;
  currency?: IApplicationCurrencySettings;
  messages?: IApplicationMessages;
}

export const DEFAULT_APPLICATION_SETTINGS: IApplicationSettings = {
  usePersistence: true,
  apiUrl: (BASE_PATH + '/api/').replace(/(\/\/)+/, '/'),
  companyName: 'Test company',
  messages: {
    logoutNotificationMessage: 'You were logged out.',
    accessDeniedMessage: 'The access is restricted for you.',
    sorryMessage: 'Sorry about that.',
  },
  dateTimeSettings: {
    dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
    dateFormat: 'YYYY-MM-DD',
    uiDateFormat: 'YYYY-MM-DD',
    uiTimeFormat: 'HH:mm:ss',
    pstTimeFormat: 'hh:mm A',
    pstDateFormat: 'MMM DD',
    uiDateMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    uiTimeMask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
    uiTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
  },
  phoneSettings: {
    uiPattern: '1[0-9]{10}',
    uiMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    uiCountryAbbreviation: 'US',
  },
  currency: {
    uiLocale: 'en-US',
    uiCurrency: 'USD',
  },
};
