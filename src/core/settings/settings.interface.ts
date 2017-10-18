import { BASE_PATH } from '../env';

export interface IApplicationDateTimeSettings {
  dateTimeFormat?: string;   // Client-server communication format
  dateFormat?: string;       // Client-server communication format
  uiDateFormat?: string;     // UI format
  uiTimeFormat?: string;     // UI format
  uiDateMask?: Array<string|RegExp>;     // UI mask
  uiTimeMask?: Array<string|RegExp>;     // UI mask
  uiDatePattern?: string;                // UI pattern
  uiTimePattern?: string;                // UI pattern
}

export interface IApplicationSettings {
  apiUrl?: string;
  companyName?: string;
  usePersistence?: boolean;
  dateTimeSettings?: IApplicationDateTimeSettings;
}

export const DEFAULT_APPLICATION_SETTINGS: IApplicationSettings = {
  usePersistence: true,
  apiUrl: (BASE_PATH + '/api/').replace(/(\/\/)+/, '/'),
  companyName: 'Test company',
  dateTimeSettings: {
    dateTimeFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
    dateFormat: 'YYYY-MM-DD',
    uiDateFormat: 'YYYY-MM-DD',
    uiTimeFormat: 'HH:mm:ss',
    uiDateMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    uiTimeMask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    uiDatePattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])',
    uiTimePattern: '([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])',
  },
};
