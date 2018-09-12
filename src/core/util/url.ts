import { IKeyValue } from '../definitions.interface';

/**
 * @stable [11.09.2018]
 * @param {IKeyValue} params
 * @returns {string}
 */
export const buildUrl = (params: IKeyValue) => encodeURIComponent(btoa(JSON.stringify(params)));

/**
 * @stable [12.09.2018]
 * @param {string} url
 * @returns {string}
 */
export const prepareUrl = (url: string): string => url.replace(/(\/\/)+/, '/');
