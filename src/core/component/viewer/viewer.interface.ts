import { IComponentConfiguration } from '../../configurations-definitions.interface';
import {
  IDefaultSrcWrapper,
  ISrcWrapper,
  IUsePreviewWrapper,
  IOpenedWrapper,
  IErrorWrapper,
} from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

/**
 * @stable [08.06.2018]
 */
export interface IViewerConfiguration extends IComponentConfiguration,
                                              ISrcWrapper,
                                              IUsePreviewWrapper,
                                              IDefaultSrcWrapper {
}

/**
 * @stable [08.06.2018]
 */
export interface IViewerProps extends IViewerConfiguration,
                                      IComponentEntity {
}

/**
 * @stable [08.06.2018]
 */
export interface IViewerState extends IErrorWrapper<Error>,
                                      IOpenedWrapper {
}
