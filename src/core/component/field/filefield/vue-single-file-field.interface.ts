import {
  IEntity,
  IPlaceholderFactoryWrapper,
  IMaxFilesWrapper,
  IViewerWrapper,
  IDefaultDndMessageWrapper,
  IDefaultDndMessageFactoryWrapper,
  IDisplayFileNameWrapper,
  IDisplayFileFormatWrapper,
  IOpenViewerPopupOnFileSelectWrapper,
} from '../../../definitions.interface';
import { IVueFieldTemplateMethods } from '../field/vue-index';
import { IVueViewerListenersEntity, IVueBaseFileViewerProps } from '../../viewer/vue-index';
import { IVueFieldProps } from '../field/vue-index';
import {
  IMultiItemEntity,
  MultiItemEntityT,
  IMultiItemFileEntity,
} from '../../../definition';

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethods extends IVueFieldTemplateMethods {
  canRenderAttachmentContent?(file: IMultiItemFileEntity | IEntity, index: number): boolean;
  getAttachmentContentClassName?(entityOrEntityId: MultiItemEntityT, index: number): string;
  getCustomDndMessage?(entity: IMultiItemFileEntity | IEntity, index: number): string;
  getDefaultDndMessage?(entity: IMultiItemFileEntity | IEntity, index: number): string;
  getEntities?(): IEntity[];
  getPlaceholder?(entityOrEntityId: MultiItemEntityT, index?: number): string;
  getViewerBindings?(entityOrEntityId: MultiItemEntityT, index: number): IVueBaseFileViewerProps;
  getViewerComponent?(file: File, index: number): string;
  getViewerListeners?(entityOrEntityId: IMultiItemEntity, index: number): IVueViewerListenersEntity<File>;
  onFilesSelect?(files: File[], entity: IMultiItemFileEntity | IEntity, index: number): void;
}

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseFileFieldProps extends IVueFieldProps,
                                                IMaxFilesWrapper,
                                                IViewerWrapper<string>,
                                                IDisplayFileNameWrapper,
                                                IOpenViewerPopupOnFileSelectWrapper,
                                                IDisplayFileFormatWrapper,
                                                IDefaultDndMessageWrapper,
                                                IDefaultDndMessageFactoryWrapper<(index: number) => string>,
                                                IPlaceholderFactoryWrapper<(index: number) => string> {
  canRenderAttachment?: (entity: IMultiItemEntity, index: number) => boolean;
}

/**
 * @stable [22.12.2018]
 */
export interface IVueSingleFileFieldProps
  extends IVueBaseFileFieldProps {
}

/**
 * @stable [22.12.2018]
 */
export interface IVueMultiFileFieldProps
  extends IVueBaseFileFieldProps {
}

/**
 * @stable [06.01.2019]
 */
export const VUE_SINGLE_FILE_FIELD_NAME = 'vue-single-file-field';
export const VUE_MULTI_FILE_FIELD_NAME = 'vue-multi-file-field';
