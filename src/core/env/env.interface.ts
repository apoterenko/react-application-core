import { LoggerFactory } from 'ts-smart-logger';
import * as P from 'platform';

import { IEnvironmentEntity } from '../entities-definitions.interface';
import { defValuesFilter } from '../util/filter';

const definedLocation = typeof location === 'undefined'
  ? { origin: '', protocol: 'http', host: 'localhost', port: '80', href: '', pathname: '', assign: (url: string) => null }
  : location;
const definedWindow = typeof window === 'undefined' ? {} : window;
const definedDocument = typeof document === 'undefined' ? { baseURI: '' } : document;
const definedLocalStorage = typeof localStorage === 'undefined' ? { getItem: (item: string) => null } : localStorage;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');

const BASE_PATH = (definedDocument.baseURI || definedLocation.href).replace(origin, '');
const RN_PLATFORM_NAME = Reflect.get(definedWindow, '$$RAC-RN_PLATFORM_NAME');
const SAFARI_PLATFORM = P.name === 'Safari';
const IOS_PLATFORM = P.os.family === 'iOS';

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
  macPlatform: P.os.family === 'OS X',
  iosPlatform: IOS_PLATFORM,
  basePath: BASE_PATH,
  normalizedBasePath: BASE_PATH.replace(/\//g, ''),
  port: definedLocation.port || '80',
  platformName: P.name,
  platformOs: P.os,
  safariPlatform: SAFARI_PLATFORM,
  passwordInputPlaceholder: SAFARI_PLATFORM && IOS_PLATFORM ? '●' : '•',
});

LoggerFactory.makeLogger('env.interface').debug('[$environment]', ENV);
