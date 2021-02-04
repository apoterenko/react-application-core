import * as R from 'ramda';
import * as URI from 'urijs';
import * as URLSearchParams from 'url-search-params';

import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';
import {
  ITransportUrlConfigEntity,
  TransportMethodsEnum,
} from '../definition';
import {
  isObjectNotEmpty,
  ObjectUtils,
} from './object';
import { FilterUtils } from './filter';
import { JsonUtils } from './json';

/**
 * @stable [07.10.2019]
 * @returns {string}
 */
export const getCurrentUrlPath = (): string => URI().path();

/**
 * @stable [13.03.2020]
 * @param {string} sectionRoute
 * @returns {string}
 */
export const getSectionFullPath = (sectionRoute: string): string => URI(getFullPath()).segment(sectionRoute).toString();

/**
 * @stable [13.03.2020]
 * @returns {string}
 */
export const getFullPath = (): string => `${getUrlProtocol()}://${getUrlHost()}${getUrlDirectory()}`;

/**
 * @stable [13.03.2020]
 * @returns {TParams}
 */
export const getUrlQueryParams = <TParams = IKeyValue>(): TParams => new URI().query(true) as AnyT;

/**
 * @stable [13.03.2020]
 * @returns {string}
 */
export const getUrlDirectory = (): string => URI().directory();

/**
 * @stable [13.03.2020]
 * @returns {string}
 */
export const getUrlHost = (): string => URI().host();

/**
 * @stable [13.03.2020]
 * @returns {string}
 */
export const getUrlProtocol = (): string => URI().protocol();

// TODO Deprecated  new URI().query(true);
export const getURLSearchParams = (search: string): URLSearchParams => new URLSearchParams(search);

/**
 * @stable [04.02.2021]
 * @param uri
 */
const isAbsoluteURI = (uri: string): boolean => URI(uri).is('absolute');

/**
 * @stable [04.02.2021]
 * @param params
 */
const buildEncodedURI = <TParams = IKeyValue>(params: TParams) => encodeURIComponent(btoa(JsonUtils.serializeJson(params)));

/**
 * @stable [04.02.2021]
 * @param initialURI
 * @param params
 */
const buildParameterizedURI = <TParams = IKeyValue>(initialURI: string, params?: TParams): string => {
  const uri = new URI(initialURI);

  params = FilterUtils.notNilValuesFilter(params || {});
  if (ObjectUtils.isObjectNotEmpty(params)) {
    R.forEachObjIndexed((value, key) => uri.addSearch(String(key), value), params);
  }
  return uri.valueOf();
};

/**
 * @stable [12.09.2018]
 * @param {string} url
 * @returns {string}
 */
export const prepareUrl = (url: string): string => url.replace(/(\/\/)+/, '/');

/**
 * @stable [16.09.2019]
 * @param {ITransportUrlConfigEntity} config
 * @returns {string}
 */
export const buildTransportUrl = (config: ITransportUrlConfigEntity) => {
  const {urlProvider, dataProvider, entity, settings, dateNow} = config;

  const uniqueParamName = settings.uniqueParamName;
  const method = entity.method;
  const initialUrl = urlProvider(entity);

  const url = new URI(initialUrl);

  if (!R.isNil(uniqueParamName) && entity.noCache !== false) {
    if (!(R.isNil(method) || [TransportMethodsEnum.POST].includes(method as TransportMethodsEnum))) {
      url.addSearch(uniqueParamName, dateNow);
    }
  }
  if (method === TransportMethodsEnum.GET) {
    const params = dataProvider(entity);
    if (isObjectNotEmpty(params)) {
      R.forEachObjIndexed((value, key) => url.addSearch(String(key), value), params);
    }
  }
  return url.valueOf();
};

/**
 * @stable [04.02.2021]
 */
export class UrlUtils {
  public static readonly buildEncodedURI = buildEncodedURI;
  public static readonly buildParameterizedURI = buildParameterizedURI;
  public static readonly isAbsoluteURI = isAbsoluteURI;
}
