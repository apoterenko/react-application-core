import { ISrcWrapper, IScaleWrapper } from '../../../definitions.interface';
import { IVueBaseProps } from '../../base/vue-base.interface';

/**
 * @stable [23.02.2019]
 */
export interface IVuePdfPreviewProps
  extends IVueBaseProps,
    ISrcWrapper {
}

/**
 * @stable [23.02.2019]
 */
export interface IVuePdfPreviewState
  extends IScaleWrapper {
}
