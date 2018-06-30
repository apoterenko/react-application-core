import { IComponentEntity } from '../../entities-definitions.interface';
import { IComponentConfiguration } from '../../configurations-definitions.interface';
import {
  ISrcWrapper,
  IDefaultSrcWrapper,
  IErrorWrapper,
  IScaleWrapper,
  IPageWrapper,
  IOpenedWrapper,
  IUsePreviewWrapper,
  IPreviewScaleWrapper,
} from '../../definitions.interface';

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerDocument {
  getPage(page: number): Promise<IPdfViewerPage>;
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerPage {
  getViewport(scale: number): IPdfViewerViewport;
  render({canvasContext: HTMLCanvasContext, viewport: IPdfViewerViewport}): void;
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerViewport {
  width: number;
  height: number;
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerConfiguration extends IComponentConfiguration,
                                                 ISrcWrapper,
                                                 IUsePreviewWrapper,
                                                 IScaleWrapper,
                                                 IPreviewScaleWrapper,
                                                 IDefaultSrcWrapper {
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerEntity extends IComponentEntity,
                                          IPageWrapper {
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerProps extends IPdfViewerConfiguration,
                                         IPdfViewerEntity {
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerState extends IErrorWrapper<Error>,
                                         IOpenedWrapper {
}
