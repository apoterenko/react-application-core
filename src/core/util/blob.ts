import {
  FileExtensionsEnum,
  MimeTypesEnum,
} from '../definition';
import { NvlUtils } from './nvl';

/**
 * @stable [09.11.2020]
 * @param base64
 * @param options
 */
const fromBase64UrlToBlob = (base64: string, options?: RequestInit): Promise<Blob> =>
  fromUrlToBlob(`data:image;base64,${base64}`, options);

/**
 * @stable [02.11.2020]
 * @param url
 * @param options
 */
const fromUrlToBlob = (url: string, options?: RequestInit): Promise<Blob> =>
  fetch(url, {mode: 'cors', ...options}).then((r) => r.blob());

/**
 * @stable [13.12.2020]
 * @param blob
 * @param length
 */
const readBlobBytes = async (blob: Blob, length?: number): Promise<number[]> => new Promise<number[]>((resolve) => {
  const fileReader = new FileReader();
  fileReader.onloadend = (evt) => {
    const target = evt.target;
    if (target.readyState === FileReader.DONE) {
      resolve(Array.from(new Uint8Array(target.result as ArrayBuffer)));
    }
  };
  fileReader.readAsArrayBuffer(blob.slice(0, NvlUtils.nvl(length, blob.size)));
});

/**
 * @stable [13.12.2020]
 * @param blob
 * @param length
 */
const readBlobBytesAsString = async (blob: Blob, length?: number): Promise<string> =>
  readBlobBytes(blob, length)
    .then((bytes) => bytes.map((byte) => byte.toString(16)).join('').toUpperCase());

/**
 * @stable [13.12.2020]
 * @param signature
 */
const asBlobMimeType = (signature: string): MimeTypesEnum | string => {
  switch (signature) {
    case '89504E47':
      return MimeTypesEnum.IMAGE_PNG;
    case '47494638':
      return MimeTypesEnum.IMAGE_GIF;
    case '25504446':
      return MimeTypesEnum.APPLICATION_PDF;
    case 'FFD8FFDB':
    case 'FFD8FFE0':
      return MimeTypesEnum.IMAGE_JPEG;
    case '504B0304':
      return MimeTypesEnum.APPLICATION_ZIP;
    default:
      return null;
  }
};

/**
 * @stable [13.12.2020]
 * @param mimeType
 */
const asFileExtension = (mimeType: MimeTypesEnum | string): FileExtensionsEnum => {
  switch (mimeType) {
    case MimeTypesEnum.IMAGE_PNG:
      return FileExtensionsEnum.PNG;
    case MimeTypesEnum.IMAGE_JPEG:
      return FileExtensionsEnum.JPEG;
    case MimeTypesEnum.IMAGE_GIF:
      return FileExtensionsEnum.GIF;
    case MimeTypesEnum.APPLICATION_PDF:
      return FileExtensionsEnum.PDF;
    case MimeTypesEnum.APPLICATION_ZIP:
      return FileExtensionsEnum.ZIP;
    default:
      return null;
  }
};

/**
 * @stable [13.12.2020]
 * @param blob
 */
const detectBlobMimeType = async (blob: Blob): Promise<MimeTypesEnum | string> =>
  asBlobMimeType(await readBlobBytesAsString(blob, 4));

/**
 * @stable [02.11.2020]
 */
export class BlobUtils {
  public static readonly asFileExtension = asFileExtension;
  public static readonly detectBlobMimeType = detectBlobMimeType;
  public static readonly fromBase64UrlToBlob = fromBase64UrlToBlob;
  public static readonly fromUrlToBlob = fromUrlToBlob;
}
