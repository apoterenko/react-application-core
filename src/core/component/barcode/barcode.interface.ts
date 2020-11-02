import * as React from 'react';

import {
  IBarcodeWrapper,
  IFilterWrapper,
  IFontSizeWrapper,
  IFooterWrapper,
  IFormatWrapper,
  IHeightWrapper,
} from '../../definitions.interface';
import { IGenericComponentProps } from '../../definition';

/**
 * @stable [10.04.2019]
 */
export interface IBarcodeProps
  extends IGenericComponentProps,
    IBarcodeWrapper,
    IHeightWrapper,
    IFilterWrapper<(barcode: BarcodeFormatEnum, barcodes: BarcodeFormatEnum[]) => boolean>,
    IFontSizeWrapper,
    IFooterWrapper<React.ReactNode | (() => React.ReactNode)>,
    IFormatWrapper<BarcodeFormatEnum[]> {
}

/**
 * @stable [10.04.2019]
 */
export enum BarcodeFormatEnum {
  CODE128 = 'CODE128',
  CODE39 = 'CODE39',
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  UPC = 'UPC',
}

/**
 * @stable [11.04.2019]
 */
export const BARCODE_APPLICABLE_FORMATS = [
  BarcodeFormatEnum.CODE128,
  BarcodeFormatEnum.CODE39,
  BarcodeFormatEnum.EAN13,
  BarcodeFormatEnum.EAN8,
  BarcodeFormatEnum.UPC
];
