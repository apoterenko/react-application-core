import { MimeTypesEnum } from '../definition';
import { nvl } from './nvl';

/**
 * @stable [01.08.2019]
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Blob>}
 */
export const fromUrlToBlob = (url: string, options?: RequestInit): Promise<Blob> =>
  fetch(url, {mode: 'cors', ...options}).then((r) => r.blob());

/**
 * @stable [04.08.2019]
 * @param {Blob} blob
 * @param {number} length
 * @returns {Promise<number[]>}
 */
export const readBlobBytes = async (blob: Blob, length?: number): Promise<number[]> => new Promise<number[]>((resolve) => {
  const fileReader = new FileReader();
  fileReader.onloadend = (evt) => {
    const target = evt.target;
    // @ts-ignore TODO
    if (target.readyState === FileReader.DONE) {
      // @ts-ignore TODO
      resolve(Array.from(new Uint8Array(target.result)));
    }
  };
  fileReader.readAsArrayBuffer(blob.slice(0, nvl(length, blob.size)));
});

/**
 * @stable [04.08.2019]
 * @param {Blob} blob
 * @param {number} length
 * @returns {Promise<string>}
 */
export const readBlobBytesAsString = async (blob: Blob, length?: number): Promise<string> =>
  readBlobBytes(blob, length)
    .then((bytes) => bytes.map((byte) => byte.toString(16)).join('').toUpperCase());

/**
 * @stable [04.08.2019]
 * @param {string} signature
 * @returns {MimeTypesEnum | string}
 */
export const getBlobMimeType = (signature: string): MimeTypesEnum | string => {
  switch (signature) {
    case '89504E47':
      return MimeTypesEnum.IMAGE_PNG;
    case '47494638':
      return 'image/gif';
    case '25504446':
      return MimeTypesEnum.APPLICATION_PDF;
    case 'FFD8FFDB':
    case 'FFD8FFE0':
      return MimeTypesEnum.IMAGE_JPEG;
    case '504B0304':
      return 'application/zip';
    default:
      return null;
  }
};

/**
 * @stable [19.09.2019]
 * @param {Blob} blob
 * @returns {Promise<MimeTypesEnum | string>}
 */
export const detectBlobMimeType = async (blob: Blob): Promise<MimeTypesEnum | string> => {
  const bytes = await readBlobBytesAsString(blob, 4);
  return getBlobMimeType(bytes);
};
