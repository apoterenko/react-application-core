import * as JsBarcode from 'jsbarcode';

import {
  BARCODE_APPLICABLE_FORMATS,
  BarcodeFormatsEnum,
} from '../../definition';
import { FilterUtils } from '../../util';

/**
 * @stable [12.04.2019]
 * @param {string} barcode
 * @param {BarcodeFormatsEnum[]} formats
 * @returns {BarcodeFormatsEnum[]}
 */
export const getBarcodeApplicableFormats = (barcode: string,
                                            formats = BARCODE_APPLICABLE_FORMATS): BarcodeFormatsEnum[] =>
  FilterUtils.notNilValuesArrayFilter(
    ...formats.map((format) => {
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
  );
