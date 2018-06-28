import { IBlobEntity } from '../definitions.interface';
import { isDef, orDefault } from '../util';
import { downloadFile } from './dom';

export function toBlobEntities(ids: string[]): Promise<IBlobEntity[]> {
  return Promise.all<IBlobEntity>(orDefault<Array<Promise<IBlobEntity>>, Array<Promise<IBlobEntity>>>(
    isDef(ids),
    () => (
      ids.map<Promise<IBlobEntity>>(
        (id) =>
          fetch(id)
            .then((r) => r.blob())
            .then((blob) => ({ id, blob }))
      )
    ),
    []
  ));
}

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
