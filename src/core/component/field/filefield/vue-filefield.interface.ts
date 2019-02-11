import {
  IEntity,
  IPlaceholderFactoryWrapper,
  IMaxFilesWrapper,
  IViewerWrapper,
  IDefaultDndMessageWrapper,
  IDefaultDndMessageFactoryWrapper,
  IDisplayFileNameWrapper,
  IDisplayFileFormatWrapper,
} from '../../../definitions.interface';
import { IVueFieldTemplateMethods } from '../field/vue-index';
import { IVueViewerListenersEntity, IVueBaseFileViewerProps } from '../../viewer/vue-index';
import { IVueFieldProps } from '../field/vue-index';
import {
  IMultiItemEntity,
  MultiItemEntityT,
  IMultiItemFileEntity,
} from '../../../entities-definitions.interface';

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethods extends IVueFieldTemplateMethods {
  onFilesSelect?(files: File[], entity: IMultiItemFileEntity | IEntity, index: number): string[];
  getDefaultDndMessage?(entity: IMultiItemFileEntity | IEntity, index: number): string;
  getCustomDndMessage?(entity: IMultiItemFileEntity | IEntity, index: number): string;
  getAttachmentContentClassName?(entityOrEntityId: MultiItemEntityT, index: number): string;
  getPlaceholder?(entityOrEntityId: MultiItemEntityT, index?: number): string;
  getViewerComponent?(file: File, index: number): string;
  getViewerBindings?(entityOrEntityId: MultiItemEntityT, index: number): IVueBaseFileViewerProps;
  getViewerListeners?(entityOrEntityId: IMultiItemEntity, index: number): IVueViewerListenersEntity<File>;
  getEntities?(): IEntity[];
  canRenderAttachmentContent?(file: IMultiItemFileEntity | IEntity, index: number): boolean;
}

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseFileFieldProps extends IVueFieldProps,
                                                IMaxFilesWrapper,
                                                IViewerWrapper<string>,
                                                IDisplayFileNameWrapper,
                                                IDisplayFileFormatWrapper,
                                                IDefaultDndMessageWrapper,
                                                IDefaultDndMessageFactoryWrapper<(index: number) => string>,
                                                IPlaceholderFactoryWrapper<(index: number) => string> {
  canRenderAttachment?: (entity: IMultiItemEntity, index: number) => boolean;
}

/**
 * @stable [22.12.2018]
 */
export interface IVueFileFieldProps extends IVueBaseFileFieldProps {
}

/**
 * @stable [22.12.2018]
 */
export interface IVueMultiFileFieldProps extends IVueBaseFileFieldProps {
}

/**
 * @stable [06.01.2019]
 */
export const VUE_FILE_FIELD_NAME = 'vue-file-field';
export const VUE_MULTI_FILE_FIELD_NAME = 'vue-multi-file-field';
