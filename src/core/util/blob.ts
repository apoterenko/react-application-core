import {
  FileExtensionsEnum,
  IReadBlobConfigEntity,
  MimeTypesEnum,
} from '../definition';
import { Base64Utils } from './base64';
import { ConditionUtils } from './cond';
import { NvlUtils } from './nvl';
import { UNDEF_SYMBOL } from '../definitions.interface';

/**
 * @stable [24.05.2021]
 * @param url
 * @param options
 */
const fromUrlToBlob = (url: string, options?: RequestInit): Promise<Blob> =>
  ConditionUtils.ifNotEmptyThanValue(
    url,
    () => fetch(url, {mode: 'cors', ...options}).then((r) => r.blob()),
    UNDEF_SYMBOL
  );

/**
 * @stable [24.05.2021]
 * @param cfg
 */
const fromBlobToBytes = async (cfg: IReadBlobConfigEntity): Promise<number[]> =>
  ConditionUtils.ifNotNilThanValue(
    cfg.data,
    (blob) => (
      new Promise<number[]>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = (evt) => {
          const target = evt.target;
          if (target.readyState === FileReader.DONE) {
            resolve(Array.from(new Uint8Array(target.result as ArrayBuffer)));
          }
        };
        fileReader.onerror = (evt) => reject(evt);
        fileReader.readAsArrayBuffer(blob.slice(0, NvlUtils.nvl(cfg.length, blob.size)));
      })
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [24.05.2021]
 * @param cfg
 */
const fromBlobToString = async (cfg: IReadBlobConfigEntity): Promise<string> =>
  ConditionUtils.ifNotEmptyThanValue(
    await fromBlobToBytes(cfg),
    (bytes) => bytes.map((byte) => byte.toString(16)).join('').toUpperCase(),
    UNDEF_SYMBOL
  );

/**
 * @stable [24.05.2021]
 * @param cfg
 */
const fromBlobToBase64 = async (cfg: IReadBlobConfigEntity): Promise<string> =>
  ConditionUtils.ifNotEmptyThanValue(
    await fromBlobToString(cfg),
    (data) => Base64Utils.stringToBase64(data),
    UNDEF_SYMBOL
  );

/**
 * @stable [24.05.2021]
 * @param url
 * @param options
 */
const fromUrlToBase64 = async (url: string, options?: RequestInit): Promise<string> =>
  fromBlobToBase64({data: await fromUrlToBlob(url, options)});

/**
 * @stable [24.05.2021]
 * @param base64
 * @param options
 */
const fromBase64ToBlob = (base64: string, options?: RequestInit): Promise<Blob> =>
  fromUrlToBlob(`data:image;base64,${base64}`, options);

/**
 * @stable [24.05.2021]
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
 * @stable [24.05.2021]
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
 * @stable [24.05.2021]
 * @param data
 */
const detectBlobMimeType = async (data: Blob): Promise<MimeTypesEnum | string> =>
  asBlobMimeType(await fromBlobToString({data, length: 4}));

/**
 * @utils
 * @stable [24.05.2021]
 */
export class BlobUtils {
  public static readonly asFileExtension = asFileExtension;
  public static readonly detectBlobMimeType = detectBlobMimeType;
  public static readonly fromBase64ToBlob = fromBase64ToBlob;
  public static readonly fromBlobToBase64 = fromBlobToBase64;
  public static readonly fromBlobToString = fromBlobToString;
  public static readonly fromUrlToBase64 = fromUrlToBase64;
  public static readonly fromUrlToBlob = fromUrlToBlob;
}
