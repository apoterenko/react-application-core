import * as R from 'ramda';

/**
 * @stable [03.05.2020]
 * @param {string} barcode
 * @returns {string}
 */
export const normalizeBarcode = (barcode: string): string => {
  if (R.isNil(barcode)) {
    return barcode;
  }
  // The barcode normalization (this is a production issue fix)
  return barcode.replace(/\s{2,}/g, ' ').trim();
};
