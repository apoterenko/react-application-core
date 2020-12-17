import * as React from 'react';

import {
  IBarcodeWrapper,
  IFilterWrapper,
  IFontSizeWrapper,
  IFooterWrapper,
  IFormatWrapper,
  IHeightWrapper,
} from '../../definitions.interface';
import {
  BarcodeFormatsEnum,
  IGenericComponentProps,
} from '../../definition';

/**
 * @stable [10.04.2019]
 */
export interface IBarcodeProps
  extends IGenericComponentProps,
    IBarcodeWrapper,
    IHeightWrapper,
    IFilterWrapper<(barcode: BarcodeFormatsEnum, barcodes: BarcodeFormatsEnum[]) => boolean>,
    IFontSizeWrapper,
    IFooterWrapper<React.ReactNode | (() => React.ReactNode)>,
    IFormatWrapper<BarcodeFormatsEnum[]> {
}
