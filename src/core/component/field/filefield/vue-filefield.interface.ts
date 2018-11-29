import { AnyT, ISrcWrapper } from '../../../definitions.interface';
import {
  IVueFieldTemplateMethodsEntity,
} from '../field/vue-field.interface';

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
}

/**
 * @stable [27.11.2018]
 */
export interface IVueFileFieldTemplateMethodsEntity extends IVueBaseFileFieldTemplateMethodsEntity {
  getMessage?(): string;
  getViewerComponent?(): string;
  getViewerBindings?(...AnyT): IVueFileFieldViewerBindingsEntity;
  getViewerListeners?(...AnyT): IVueFileFieldViewerListenersEntity;
  getFiles(...AnyT);
}
