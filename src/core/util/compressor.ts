import * as Compressor from 'compressorjs';
import * as BPromise from 'bluebird';

/**
 * @stable [19.10.2020]
 * @param file
 */
const compress = async (file: File | Blob,
                        // @ts-ignore
                        options?: Compressor.Options): Promise<Blob> =>
  new BPromise<Blob>((resolve, reject) => (
    // @ts-ignore
    Reflect.construct(Compressor, [file, {
      ...options,
      quality: 0.6,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err.message);
      },
    }])
  ));

/**
 * @stable [19.10.2020]
 */
export class CompressUtils {
  public static readonly compress = compress;
}
