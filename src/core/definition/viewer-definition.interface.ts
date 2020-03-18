import {
  IDefaultSrcWrapper,
  IErrorWrapper,
  IFullWrapper,
  IHeightWrapper,
  IOpenedWrapper,
  IPageWrapper,
  IPreviewPageWrapper,
  IPreviewScaleWrapper,
  IProgressWrapper,
  IScaleWrapper,
  ISrcWrapper,
  IUsePreviewWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @base-entity
 * @stable [16.03.2020]
 */
export interface IBaseViewerEntity
  extends IPageWrapper,
    IPreviewPageWrapper,
    IPreviewScaleWrapper,
    IScaleWrapper {
}

/**
 * @generic-entity
 * @stable [16.03.2020]
 */
export interface IGenericViewerEntity
  extends IBaseViewerEntity,
    IDefaultSrcWrapper,
    IFullWrapper,
    ISrcWrapper,
    IUsePreviewWrapper {
}

/**
 * @generic-entity
 * @stable [16.03.2020]
 */
export interface IGenericPdfViewerEntity
  extends IGenericViewerEntity {
}

/**
 * @generic-entity
 * @stable [16.03.2020]
 */
export interface IGenericPictureViewerEntity
  extends IGenericViewerEntity {
}

/**
 * @generic-state
 * @stable [16.03.2020]
 */
export interface IGenericViewerState
  extends IBaseViewerEntity,
    IErrorWrapper<Error>,
    IOpenedWrapper,
    IProgressWrapper {
}

/**
 * @state
 * @stable [16.03.2020]
 */
export interface IViewerState
  extends IGenericViewerState {
}

/**
 * @props
 * @stable [19.09.2018]
 */
export interface IViewerProps
  extends IComponentProps,
    IGenericViewerEntity {
}

/**
 * @props
 * @stable [16.03.2020]
 */
export interface IPdfViewerProps
  extends IComponentProps,
    IGenericPdfViewerEntity {
}

/**
 * @props
 * @stable [16.03.2020]
 */
export interface IPictureViewerProps
  extends IComponentProps,
    IGenericPictureViewerEntity {
}

/**
 * @stable [19.09.2019]
 */
export interface IPdfViewerViewport
  extends IHeightWrapper,
    IWidthWrapper {
}

/**
 * @classes
 * @stable [15.03.2020]
 */
export enum ViewerClassesEnum {
  EMPTY_VIEWER = 'rac-empty-viewer',
  FULL_VIEWER = 'rac-full-viewer',
  INFO_VIEWER = 'rac-info-viewer',
  PICTURE_VIEWER = 'rac-picture-viewer',
  VIEWER = 'rac-viewer',
  VIEWER_CONTENT = 'rac-viewer__content',
  VIEWER_PREVIEW_ICON = 'rac-viewer__preview-icon',
}
