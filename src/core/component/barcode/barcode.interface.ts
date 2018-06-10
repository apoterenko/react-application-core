import { IComponentConfiguration } from '../../configurations-definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';
import {
  IBarcodeWrapper,
  IHeightWrapper,
  IFontSizeWrapper,
} from '../../definitions.interface';

/**
 * @stable [11.06.2018]
 */
export interface IBarcodeConfiguration extends IComponentConfiguration,
                                               IHeightWrapper,
                                               IFontSizeWrapper {
}

/**
 * @stable [11.06.2018]
 */
export interface IBarcodeEntity extends IComponentEntity,
                                        IBarcodeWrapper {
}

/**
 * @stable [11.06.2018]
 */
export interface IBarcodeProps extends IBarcodeConfiguration,
                                       IBarcodeEntity {
}
