import * as React from 'react';

import {
  IBarcodeWrapper,
  IFilterWrapper,
  IFontSizeWrapper,
  IFooterWrapper,
  IFormatWrapper,
  IHeightWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../definition';

/**
 * @stable [10.04.2019]
 */
export interface IBarcodeProps
  extends IComponentProps,
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
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  CODE39 = 'CODE39',
  UPC = 'UPC',
}

/**
 * @stable [11.04.2019]
 */
export const BARCODE_APPLICABLE_FORMATS = [
  BarcodeFormatEnum.EAN8,
  BarcodeFormatEnum.EAN13,
  BarcodeFormatEnum.CODE39,
  BarcodeFormatEnum.UPC
];
