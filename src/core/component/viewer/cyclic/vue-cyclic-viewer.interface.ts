import {
  IListWrapper,
  IFormatWrapper,
  IUrlWrapper,
  IIndexWrapper,
} from '../../../definitions.interface';
import { IVueBaseProps } from '../../base/vue-base.interface';

/**
 * @stable [29.01.2019]
 */
export interface IVueCyclicViewerPayloadEntity extends IFormatWrapper,
                                                       IUrlWrapper {
}

/**
 * @stable [29.01.2019]
 */
export interface IVueCyclicViewerProps extends IVueBaseProps,
                                               IListWrapper<IVueCyclicViewerPayloadEntity[]> {
}

/**
 * @stable [29.01.2019]
 */
export interface IVueCyclicViewerState extends IIndexWrapper {
}

/**
 * @stable [29.01.2019]
 */
export const VUE_CYCLIC_VIEWER_NAME = 'vue-cyclic-viewer';
