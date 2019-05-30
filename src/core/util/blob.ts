import * as R from 'ramda';

import { downloadFile } from './dom';
import { IBlobEntity } from '../entities-definitions.interface';

/**
 * @stable [28.06.2018]
 * @param {string[]} ids
 * @returns {Promise<IBlobEntity[]>}
 */
export const toBlobEntities = (...ids: string[]): Promise<IBlobEntity[]> => (
  Promise.all<IBlobEntity>(
    Array.isArray(ids)
      ? ids.map<Promise<IBlobEntity>>((id) => fetch(id).then((r) => r.blob()).then((blob) => ({id, blob})))
      : []
  )
);

/**
 * @stable [16.12.2018]
 * @param {string} ids
 * @returns {Promise<Record<number, Blob>>}
 */
export const toBlobEntitiesMap = async (...ids: string[]): Promise<Record<number, Blob>> => {
  const entities = await toBlobEntities(...ids);
  return R.mergeAll(entities.map((itm, index): Record<number, Blob> => ({[ids[index]]: itm.blob})));
};

/**
 * @stable [28.06.2018]
 * @param {string} url
 * @param {string} fileName
 * @param {RequestInit} options
 */
export const downloadBlob = (url: string, fileName: string, options?: RequestInit) => {
  fetch(url, {mode: 'cors', ...options})
    .then((res) => res.blob()).then((blob) => downloadFile(fileName, blob));
};
