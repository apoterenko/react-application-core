import { LoggerFactory } from 'ts-smart-logger';
import * as P from 'platform';

import { IEnvironmentEntity } from '../entities-definitions.interface';
import { defValuesFilter } from '../util/filter';
import { buildNormalizedPath } from '../util/route';

const definedLocation = typeof location === 'undefined'
  ? { origin: '', protocol: 'http', host: 'localhost', port: '80', href: '', pathname: '', assign: (url: string) => null }
  : location;
const definedWindow = typeof window === 'undefined' ? {} : window;
const definedDocument = typeof document === 'undefined' ? { baseURI: '', body: null } : document;
const definedLocalStorage = typeof localStorage === 'undefined' ? { getItem: (item: string) => null } : localStorage;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');

const BASE_PATH = (definedDocument.baseURI || definedLocation.href).replace(origin, '');
const RN_PLATFORM_NAME = Reflect.get(definedWindow, '$$RAC-RN_PLATFORM_NAME');
const SAFARI_PLATFORM = P.name === 'Safari';
/**/
const ANDROID_PLATFORM = P.os.family === 'Android';
const IOS_PLATFORM = P.os.family === 'iOS';
const MAC_PLATFORM = P.os.family === 'OS X';
const WINDOWS_PHONE_PLATFORM = P.os.family === 'Windows Phone';
/**/
export const ENV = defValuesFilter<IEnvironmentEntity, IEnvironmentEntity>({
  appVersion: process.env.APP_VERSION || '0.0.1',
  appProfile: process.env.APP_PROFILE || 'DEFAULT',
  appNamespace: process.env.APP_NAMESPACE,
  prodMode: process.env.NODE_ENV === 'production',
  devModeEnabled: !!definedLocalStorage.getItem('$$RAC-DEV_MODE'),
  googleKey: process.env.GOOGLE_KEY,
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  rnPlatformName: RN_PLATFORM_NAME,
  rnPlatform: !!RN_PLATFORM_NAME,
  /**/
  androidPlatform: ANDROID_PLATFORM,
  iosPlatform: IOS_PLATFORM,
  macPlatform: MAC_PLATFORM,
  windowsPhonePlatform: WINDOWS_PHONE_PLATFORM,
  mobilePlatform: ANDROID_PLATFORM || IOS_PLATFORM || WINDOWS_PHONE_PLATFORM,
  /**/
  basePath: BASE_PATH,
  normalizedBasePath: BASE_PATH.replace(/\//g, ''),
  port: definedLocation.port || '80',
  platformName: P.name,
  platformOs: P.os,
  safariPlatform: SAFARI_PLATFORM,
  passwordInputPlaceholder: SAFARI_PLATFORM && IOS_PLATFORM ? '●' : '•',
  documentBody: definedDocument.body,
  localModeEnabled: location.hostname === 'localhost',
  appPath: () => buildNormalizedPath(`${definedLocation.pathname}/`.replace(BASE_PATH, '/')),
  buildAppPath: (path) => buildNormalizedPath(`${BASE_PATH}/${path}/`),
});

LoggerFactory.makeLogger('env.interface').debug(`[$environment] ${JSON.stringify(ENV)}`);
