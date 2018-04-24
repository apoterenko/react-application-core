const definedLocation = typeof location === 'undefined'
  ? { origin: '', protocol: 'http', host: 'localhost', port: '80', href: '' }
  : location;
const definedWindow = typeof window === 'undefined' ? {} : window;
const definedDocument = typeof document === 'undefined' ? { baseURI: '' } : document;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');
export const APP_VERSION = process.env.APP_VERSION || '0.0.1';
export const APP_PROFILE = process.env.APP_PROFILE || 'DEFAULT_PROFILE';
export const APP_NAMESPACE = process.env.APP_NAMESPACE;
export const PROD_MODE = process.env.NODE_ENV === 'production';
export const GOOGLE_KEY = process.env.GOOGLE_KEY;
export const RN_PLATFORM = Reflect.get(definedWindow, '$$RN_PLATFORM');
export const RN_MODE_ENABLED = !!RN_PLATFORM;
export const BASE_PATH = (definedDocument.baseURI || definedLocation.href).replace(origin, '');
export const PORT = definedLocation.port || '80';
export const NORMALIZED_BASE_PATH = BASE_PATH.replace(/\//g, '');
