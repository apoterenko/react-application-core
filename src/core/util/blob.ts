import { downloadFile } from './dom';

/**
 * @stable [01.08.2019]
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Blob>}
 */
export const fromUrlToBlob = (url: string, options?: RequestInit): Promise<Blob> =>
  fetch(url, {mode: 'cors', ...options}).then((r) => r.blob());

/**
 * @stable [28.06.2018]
 * @param {string} url
 * @param {string} fileName
 * @param {RequestInit} options
 */
export const downloadBlob = (url: string, fileName: string, options?: RequestInit) =>
  fromUrlToBlob(url, options).then((blob) => downloadFile(fileName, blob));
