import { AnyT, ISrcWrapper } from '../../../definitions.interface';
import { IVueFieldTemplateMethodsEntity } from '../field/vue-index';

/**
 * @stable [27.11.2018]
 */
export interface IVueFileFieldViewerListenersEntity {
  change?(newValue: AnyT): void;
}

/**
 * @stable [27.11.2018]
 */
export interface IVueFileFieldViewerBindingsEntity extends ISrcWrapper {
}

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethodsEntity extends IVueFieldTemplateMethodsEntity {
  onFilesSelect?(files: File[]): string[];
  getViewerComponent?(): string;
  getLabel?(index?: number): string;
  getViewerBindings?(...AnyT): IVueFileFieldViewerBindingsEntity;
}

/**
 * @stable [27.11.2018]
 */
export interface IVueFileFieldTemplateMethodsEntity extends IVueBaseFileFieldTemplateMethodsEntity {
  getViewerListeners?(...AnyT): IVueFileFieldViewerListenersEntity;
  getFiles(...AnyT);
}
