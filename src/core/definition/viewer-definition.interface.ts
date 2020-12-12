import {
  AnyT,
  IDefaultSrcWrapper,
  IErrorWrapper,
  IFullWrapper,
  IHeightWrapper,
  IOpenedWrapper,
  IPageWrapper,
  IPreviewDialogConfigurationWrapper,
  IPreviewPageWrapper,
  IPreviewScaleWrapper,
  IProgressWrapper,
  IScaleWrapper,
  ISrcWrapper,
  IUsePreviewWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import {
  IGenericComponentCtor,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IDialogProps } from './dialog-definition.interface';

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
    IPreviewDialogConfigurationWrapper<IDialogProps>,
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
  extends IGenericComponentProps,
    IGenericViewerEntity {
}

/**
 * @props
 * @stable [16.03.2020]
 */
export interface IPdfViewerProps
  extends IGenericComponentProps,
    IGenericPdfViewerEntity {
}

/**
 * @props
 * @stable [16.03.2020]
 */
export interface IPictureViewerProps
  extends IGenericComponentProps,
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
 * @stable [23.03.2020]
 */
export interface IPdfViewerPageEntity {
  getViewport(scale: number): IPdfViewerViewport;
  render({canvasContext: HTMLCanvasContext, viewport: IPdfViewerViewport}): void;
}

/**
 * @stable [23.03.2020]
 */
export interface IPdfViewerDocumentEntity {
  numPages: number;
  getPage(page: number): Promise<IPdfViewerPageEntity>;
}

/**
 * @generic-plugin
 * @stable [23.03.2020]
 */
export interface IGenericPdfPlugin {
  hasLoadedDocument: boolean;
  pagesCount: number;
  cancel(): void;
  loadDocument(): void;
  refreshPage(): void;
  setAutoScale(autoScale: boolean): IGenericPdfPlugin;
  setOnError(onError: (error: AnyT) => void): IGenericPdfPlugin;
  setOnStart(onStart: () => void): IGenericPdfPlugin;
  setPage(page: number): IGenericPdfPlugin;
  setScale(scale: number): IGenericPdfPlugin;
  setSrc(src: string): IGenericPdfPlugin;
}

/**
 * @stable [19.06.2020]
 */
export enum ViewersEnum {
  PDF,
  PICTURE,
}

/**
 * @ctor
 * @stable [19.06.2020]
 */
export interface IViewerCtor
  extends IGenericComponentCtor<IViewerProps, IViewerState> {
}

/**
 * @service
 * @stable [19.06.2020]
 */
export interface IViewerLocator {
  register(name: ViewersEnum, ctor: IViewerCtor): void;
  resolve(name: ViewersEnum): IViewerCtor;
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
