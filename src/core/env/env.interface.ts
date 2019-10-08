import { LoggerFactory } from 'ts-smart-logger';
import * as P from 'platform';

import { IEnvironmentEntity } from '../entities-definitions.interface';
import { defValuesFilter } from '../util/filter';
import { buildNormalizedPath } from '../util/route';

const definedLocation = typeof location === 'undefined'
  ? { origin: '', protocol: 'http', host: 'localhost', port: '80', href: '', pathname: '', assign: (url: string) => null }
  : location;
const definedWindow = typeof window === 'undefined' ? {} as Window : window;
const definedDocument = typeof document === 'undefined' ? { baseURI: '', body: null } as Document : document;
const definedLocalStorage = typeof localStorage === 'undefined' ? { getItem: (item: string) => null } : localStorage;

const origin = definedLocation.origin || [definedLocation.protocol, definedLocation.host].join('//');

const BASE_PATH = (definedDocument.baseURI || definedLocation.href).replace(origin, '');
const RN_PLATFORM_NAME = Reflect.get(definedWindow, '$$RAC-RN_PLATFORM_NAME');
/**/
export const ENV = defValuesFilter<IEnvironmentEntity, IEnvironmentEntity>({
  document: definedDocument,
  window: definedWindow,
  appVersion: process.env.APP_VERSION || '0.0.1',
  appProfile: process.env.APP_PROFILE || 'DEFAULT',
  prodMode: process.env.NODE_ENV === 'production',
  stageMode: process.env.NODE_ENV === 'stage',
  devModeEnabled: !!definedLocalStorage.getItem('$$RAC-DEV_MODE'),
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  rnPlatformName: RN_PLATFORM_NAME,
  rnPlatform: !!RN_PLATFORM_NAME,
  /**/
  host: definedLocation.host,
  basePath: BASE_PATH,
  normalizedBasePath: BASE_PATH.replace(/\//g, ''),
  port: definedLocation.port || '80',
  platformName: P.name,
  documentBody: definedDocument.body,
  appPath: () => buildNormalizedPath(`${definedLocation.pathname}/`.replace(BASE_PATH, '/')),
  buildAppPath: (path) => buildNormalizedPath(`${BASE_PATH}/${path}/`),
});

LoggerFactory.makeLogger('env.interface').debug(`[$environment] ${JSON.stringify({
  ...ENV,
  document: null,
  window: null,
})}`);
