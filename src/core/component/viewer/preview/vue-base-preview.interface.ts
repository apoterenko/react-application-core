import { IVueBaseProps } from '../../base/vue-base.interface';
import {
  ISrcWrapper,
  IScaleFactorWrapper,
  IScaleWrapper,
} from '../../../definitions.interface';

/**
 * @stable [30.01.2019]
 */
export interface IVueBasePreviewProps extends IVueBaseProps,
                                              ISrcWrapper,
                                              IScaleFactorWrapper {
}

/**
 * @stable [30.01.2019]
 */
export interface IVueBasePreviewState extends IScaleWrapper {
}

/**
 * @stable [30.01.2019]
 */
export interface IVueBasePreviewTemplateMethods {
  onScaleIncrease?(): void;
  onScaleDecrease?(): void;
}
