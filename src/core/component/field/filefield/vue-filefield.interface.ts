import {
  IEntity,
  IPlaceholderFactoryWrapper,
  IMaxFilesWrapper,
  IViewerWrapper,
  IDefaultDndMessageWrapper,
  IDefaultDndMessageFactoryWrapper,
} from '../../../definitions.interface';
import { IVueFieldTemplateMethods } from '../field/vue-index';
import { IVueViewerListenersEntity, IVueBaseFileViewerProps } from '../../viewer/vue-index';
import { IVueFieldProps } from '../field/vue-index';

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethods extends IVueFieldTemplateMethods {
  onFilesSelect?(files: File[]): string[];
  getDefaultDndMessage?(index?: number): string;
  getPlaceholder?(index?: number): string;
  getViewerComponent?(file: File, index: number): string;
  getViewerBindings?(...AnyT): IVueBaseFileViewerProps;
  getViewerListeners?(...AnyT): IVueViewerListenersEntity<File>;
  getFiles?(...AnyT): IEntity[];
}

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseFileFieldProps extends IVueFieldProps,
                                                IMaxFilesWrapper,
                                                IViewerWrapper<string>,
                                                IDefaultDndMessageWrapper,
                                                IDefaultDndMessageFactoryWrapper<(index: number) => string>,
                                                IPlaceholderFactoryWrapper<(index: number) => string> {
}

/**
 * @stable [22.12.2018]
 */
export interface IVueMultiFileFieldProps extends IVueBaseFileFieldProps {
}
