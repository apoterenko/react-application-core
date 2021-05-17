import {
  IDefaultSrcWrapper,
  IDegreeWrapper,
  IErrorWrapper,
  IFullWrapper,
  IHeightWrapper,
  IOnClosePreviewWrapper,
  IOnShowPreviewWrapper,
  IOpenedWrapper,
  IPageWrapper,
  IPreviewDegreeWrapper,
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
 * @stable [15.05.2021]
 */
export interface IPresetsBaseViewerEntity
  extends IDegreeWrapper,                                             /* @stable [15.05.2021] */
    IOpenedWrapper,                                                   /* @stable [15.05.2021] */
    IPageWrapper,                                                     /* @stable [15.05.2021] */
    IPreviewDegreeWrapper,                                            /* @stable [15.05.2021] */
    IPreviewPageWrapper,                                              /* @stable [15.05.2021] */
    IPreviewScaleWrapper,                                             /* @stable [15.05.2021] */
    IScaleWrapper {
}

/**
 * @presets-entity
 * @stable [14.12.2020]
 */
export interface IPresetsViewerEntity
  extends IPresetsBaseViewerEntity,
    IDefaultSrcWrapper,
    IFullWrapper,
    IOnClosePreviewWrapper,
    IOnShowPreviewWrapper,
    IPreviewDialogConfigurationWrapper<IDialogProps>,
    ISrcWrapper,
    IUsePreviewWrapper {
}

/**
 * @state
 * @stable [16.03.2020]
 */
export interface IViewerState
  extends IPresetsBaseViewerEntity,
    IErrorWrapper<Error>,
    IProgressWrapper {
}

/**
 * @generic-entity
 * @stable [16.05.2021]
 */
export interface IGenericViewerEntity
  extends IPresetsViewerEntity {
}

/**
 * @generic-entity
 * @stable [16.05.2021]
 */
export interface IGenericPictureViewerEntity
  extends IGenericViewerEntity {
}

/**
 * @generic-entity
 * @stable [16.05.2021]
 */
export interface IGenericPdfViewerEntity
  extends IGenericViewerEntity {
}

/**
 * @props
 * @stable [16.05.2021]
 */
export interface IViewerProps
  extends IGenericComponentProps,
    IGenericViewerEntity {
}

/**
 * @props
 * @stable [16.05.2021]
 */
export interface IPdfViewerProps
  extends IGenericComponentProps,
    IGenericPdfViewerEntity {
}

/**
 * @props
 * @stable [16.05.2021]
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
 * @entity
 * @stable [17.05.2021]
 */
export interface IPdfViewerPageEntity {
  getViewport(scale: number, rotation?: number): IPdfViewerViewport;
  render({canvasContext: HTMLCanvasContext, viewport: IPdfViewerViewport}): void;
}

/**
 * @entity
 * @stable [17.05.2021]
 */
export interface IPdfViewerDocumentEntity {
  numPages: number;
  getPage(page: number): Promise<IPdfViewerPageEntity>;
}

/**
 * @generic-plugin
 * @stable [17.05.2021]
 */
export interface IGenericPdfPlugin {
  hasLoadedDocument: boolean;
  pagesCount: number;
  cancel(): void;
  loadDocument(): void;
  refreshPage(): void;
  setAutoScale(autoScale: boolean): IGenericPdfPlugin;
  setDegree(degree: number): IGenericPdfPlugin;
  setOnError(onError: (error: Error) => void): IGenericPdfPlugin;
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
  FULL_VIEWER = 'rac-full-viewer',
  INFO_VIEWER = 'rac-info-viewer',
  PDF_VIEWER = 'rac-pdf-viewer',
  PICTURE_VIEWER = 'rac-picture-viewer',
  SELECTABLE_VIEWER = 'rac-selectable-viewer',
  VIEWER = 'rac-viewer',
  VIEWER_CONTENT = 'rac-viewer__content',
}
