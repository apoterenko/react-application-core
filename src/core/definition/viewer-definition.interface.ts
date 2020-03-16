import {
  IDefaultSrcWrapper,
  IErrorWrapper,
  IFullWrapper,
  IHeightWrapper,
  IOpenedWrapper,
  IPageWrapper,
  IPreviewPageWrapper,
  IPreviewScaleWrapper,
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
 * @generic-state
 * @stable [16.03.2020]
 */
export interface IGenericViewerState
  extends IBaseViewerEntity,
    IErrorWrapper<Error>,
    IOpenedWrapper {
}

/**
 * @state
 * @stable [16.03.2020]
 */
export interface IViewerState
  extends IGenericViewerState {
}

/**
 * @state
 * @stable [16.03.2020]
 */
export interface IPdfViewerState
  extends IViewerState {
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
 * @generic-entity
 * @stable [16.03.2020]
 */
export interface IGenericPdfViewerEntity
  extends IGenericViewerEntity {
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
  FULL_VIEWER = 'rac-full-viewer',
  VIEWER = 'rac-viewer',
}
