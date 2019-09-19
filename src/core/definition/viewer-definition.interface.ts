import {
  IDefaultSrcWrapper,
  IFullWrapper,
  IHeightWrapper,
  IPageWrapper,
  IPreviewScaleWrapper,
  IScaleWrapper,
  ISrcWrapper,
  IUsePreviewWrapper,
  IWidthWrapper,
} from '../definitions.interface';

/**
 * @stable [19.09.2019]
 */
export interface IViewerEntity
  extends ISrcWrapper,
    IFullWrapper,
    IUsePreviewWrapper,
    IDefaultSrcWrapper,
    IPageWrapper,
    IScaleWrapper,
    IPreviewScaleWrapper {
}

/**
 * @stable [19.09.2019]
 */
export interface IPdfViewerEntity
  extends IViewerEntity {
}

/**
 * @stable [19.09.2019]
 */
export interface IPdfViewerViewport
  extends IHeightWrapper,
    IWidthWrapper {
}
