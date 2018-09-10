import { LoggerFactory } from 'ts-smart-logger';
import * as P from 'platform';

const logger = LoggerFactory.makeLogger('env.interface');

const definedLocation = typeof location === 'undefined'
  ? { origin: '', protocol: 'http', host: 'localhost', port: '80', href: '', pathname: '', assign: (url: string) => null }
  : location;
const definedWindow = typeof window === 'undefined' ? {} : window;
const definedDocument = typeof document === 'undefined' ? { baseURI: '' } : document;
const definedLocalStorage = typeof localStorage === 'undefined' ? { getItem: (item: string) => null } : localStorage;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');
export const APP_VERSION = process.env.APP_VERSION || '0.0.1';
export const APP_PROFILE = process.env.APP_PROFILE || 'DEFAULT_PROFILE';
export const APP_NAMESPACE = process.env.APP_NAMESPACE;
export const PROD_MODE = process.env.NODE_ENV === 'production';
export const GOOGLE_KEY = process.env.GOOGLE_KEY;
export const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
export const RN_PLATFORM = Reflect.get(definedWindow, '$$RAC-RN_PLATFORM');
export const RN_MODE_ENABLED = !!RN_PLATFORM;
export const DEV_MODE_ENABLED = !!definedLocalStorage.getItem('$$RAC-DEV_MODE');
export const BASE_PATH = (definedDocument.baseURI || definedLocation.href).replace(origin, '');
export const PORT = definedLocation.port || '80';
export const NORMALIZED_BASE_PATH = BASE_PATH.replace(/\//g, '');

logger.debug('[$environment]', {
  APP_VERSION,
  APP_PROFILE,
  APP_NAMESPACE,
  PROD_MODE,
  GOOGLE_KEY,
  GOOGLE_MAPS_KEY,
  RN_PLATFORM,
  RN_MODE_ENABLED,
  BASE_PATH,
  PORT,
  NORMALIZED_BASE_PATH,
  DEV_MODE_ENABLED,
  PLATFORM_NAME: P.name,
  PLATFORM_OS: P.os,
});
