import {
  IDisplayFileNameWrapper,
  EntityCallbackWrapperT,
  IFileNameWrapper,
  IPlaceholderWrapper,
  IEntityWrapper,
} from '../../../definitions.interface';
import { IVueBasePictureViewerTemplateMethodsEntity } from '../picture/vue-index';
import { IVueViewerProps } from '../vue-viewer.interface';

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseFileViewerProps extends IVueViewerProps,
                                                 IFileNameWrapper,
                                                 IPlaceholderWrapper,
                                                 IEntityWrapper,
                                                 IDisplayFileNameWrapper<EntityCallbackWrapperT> {
}

/**
 * @stable [09.12.2018]
 */
export interface IVueFileViewerTemplateMethodsEntity extends IVueBasePictureViewerTemplateMethodsEntity {
  getFileName?(): string;
  getPlaceholder?(): string;
}
