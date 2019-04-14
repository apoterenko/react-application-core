import * as JsBarcode from 'jsbarcode';

import {
  BARCODE_APPLICABLE_FORMATS,
  BarcodeFormatEnum,
} from './barcode.interface';

/**
 * @stable [12.04.2019]
 * @param {string} barcode
 * @param {BarcodeFormatEnum[]} formats
 * @returns {BarcodeFormatEnum[]}
 */
export const getBarcodeApplicableFormats = (barcode: string,
                                            formats = BARCODE_APPLICABLE_FORMATS): BarcodeFormatEnum[] => {
  return formats
    .map((format) => {
      let value;
      JsBarcode({}, barcode, {
        format,
        valid: (valid) => {
          if (valid) {
            value = format;
          }
        },
      });
      return value;
    })
    .filter((format) => !!format);
};
