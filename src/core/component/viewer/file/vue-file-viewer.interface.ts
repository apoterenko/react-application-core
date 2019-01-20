import {
  IDisplayFileNameWrapper,
  EntityCallbackWrapperT,
  IFileNameWrapper,
  IPlaceholderWrapper,
  IEntity,
} from '../../../definitions.interface';
import { IVueBasePictureViewerTemplateMethodsEntity } from '../picture/vue-index';
import { IVueViewerProps } from '../vue-viewer.interface';

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseFileViewerProps<TEntity extends IEntity = IEntity>
  extends IVueViewerProps<TEntity>,
          IFileNameWrapper,
          IPlaceholderWrapper,
          IDisplayFileNameWrapper<EntityCallbackWrapperT> {
}

/**
 * @stable [09.12.2018]
 */
export interface IVueFileViewerTemplateMethodsEntity extends IVueBasePictureViewerTemplateMethodsEntity {
  getFileName?(): string;
  getPlaceholder?(): string;
}

/**
 * @stable [19.01.2018]
 */
export const VUE_FILE_VIEWER_NAME = 'vue-file-viewer';
