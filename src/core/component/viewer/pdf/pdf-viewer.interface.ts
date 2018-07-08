import { IComponentEntity } from '../../../entities-definitions.interface';
import { IPageWrapper, IScaleWrapper, IPreviewScaleWrapper } from '../../../definitions.interface';
import { IViewerConfiguration, IViewerState  } from '../viewer.interface';

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
export interface IPdfViewerConfiguration extends IViewerConfiguration,
                                                 IScaleWrapper,
                                                 IPreviewScaleWrapper {
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
export interface IPdfViewerState extends IViewerState {
}
