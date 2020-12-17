/**
 * @enum
 * @stable [17.12.2020]
 */
export enum BarcodeFormatsEnum {
  CODE128 = 'CODE128',
  CODE39 = 'CODE39',
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  UPC = 'UPC',
}

/**
 * @enum
 * @stable [17.12.2020]
 */
export const BARCODE_APPLICABLE_FORMATS = [
  BarcodeFormatsEnum.CODE128,
  BarcodeFormatsEnum.CODE39,
  BarcodeFormatsEnum.EAN13,
  BarcodeFormatsEnum.EAN8,
  BarcodeFormatsEnum.UPC
];

/**
 * @classes
 * @stable [08.06.2020]
 */
export enum BarcodeClassesEnum {
  BARCODE = 'rac-barcode',
  DATA = 'rac-barcode__data',
}
