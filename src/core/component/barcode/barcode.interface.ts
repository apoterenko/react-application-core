import {
  IBarcodeWrapper,
  IFontSizeWrapper,
  IFormatWrapper,
  IHeightWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [10.04.2019]
 */
export interface IBarcodeProps
  extends IComponentProps,
    IBarcodeWrapper,
    IHeightWrapper,
    IFontSizeWrapper,
    IFormatWrapper<BarcodeFormatEnum[]> {
}

/**
 * @stable [10.04.2019]
 */
export enum BarcodeFormatEnum {
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  CODE39 = 'CODE39',
}
