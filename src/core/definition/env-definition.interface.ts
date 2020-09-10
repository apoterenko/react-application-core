import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';

/**
 * @stable [28.08.2019]
 */
export enum EnvironmentGlobalVariablesEnum {
  API = '$$api',
  DATE_CONVERTER = '$$dateConverter',
  ENVIRONMENT = '$$env',
  TRANSPORT = '$$transport',
}

/**
 * @stable [11.09.2019]
 */
export interface IEnvironment {
  androidPlatform?: boolean;
  appNamespace?: string;
  appProfile?: string;
  appVersion?: string;
  basePath?: string;
  browserName?: string;
  browserVersion?: string;
  chromePlatform?: boolean;
  devMode?: boolean;
  document?: Document;
  googleKey?: string;
  googleMapsKey?: string;
  host?: string;
  ios13Platform?: boolean;
  iosPlatform?: boolean;
  macPlatform?: boolean;
  mobilePlatform?: boolean;
  normalizedBasePath?: string;
  passwordPlaceholder?: string;
  path?: string;
  platformName?: string;
  platformType?: string;
  platformVersion?: string;
  port?: string;
  prodMode?: boolean;
  safariMobilePlatform?: boolean;
  safariOrSafariMobilePlatform?: boolean;
  safariPlatform?: boolean;
  touchedPlatform?: boolean;
  window?: Window;
  windowsPhonePlatform?: boolean;
  windowsPlatform?: boolean;
  getSectionFullPath?(sectionRoute: string): string;
  getUrlQueryParams?<TParams = IKeyValue>(): TParams;
  setVariable?(name: string, scope: AnyT): void;
}

/**
 * @stable [10.09.2020]
 */
const definedLocation = typeof location === 'undefined'
  ? ({
    assign: () => null,
    host: 'localhost',
    href: '',
    origin: '',
    pathname: '',
    port: '80',
    protocol: 'http',
  })
  : location;

const definedWindow = typeof window === 'undefined'
  ? {} as Window
  : window;

const definedDocument = typeof document === 'undefined'
  ? ({
    baseURI: '',
    body: null,
  }) as Document
  : document;

const definedLocalStorage = typeof localStorage === 'undefined'
  ? ({
    getItem: () => null,
  })
  : localStorage;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');
const basePath = (definedDocument.baseURI || definedLocation.href).replace(origin, '');

/**
 * @default-entity
 * @stable [10.09.2020]
 */
export const DEFAULT_ENVIRONMENT_ENTITY = Object.freeze<IEnvironment>({
  appProfile: process.env.APP_PROFILE || 'DEFAULT',
  appVersion: process.env.APP_VERSION || '0.0.1',
  basePath,
  devMode: !!definedLocalStorage.getItem('$$RAC-DEV_MODE'),
  document: definedDocument,
  host: definedLocation.host,
  normalizedBasePath: basePath.replace(/\//g, ''),
  port: definedLocation.port || '80',
  prodMode: process.env.NODE_ENV === 'production',
  window: definedWindow,
});
