import { IBindDictionaryWrapper } from '../../../definitions.interface';
import { IMenuItemEntity, ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IVueFieldTemplateMethodsEntity } from '../field/vue-index';
import { IVueBaseTextFieldProps } from '../textfield/vue-index';

/**
 * @stable [21.12.2018]
 */
export interface IVueSelectProps extends IVueBaseTextFieldProps,
                                         IBindDictionaryWrapper {
}

/**
 * @stable [20.12.2018]
 */
export type VueSelectFilterT = (option: ISelectOptionEntity, query: string) => boolean;

/**
 * @stable [17.11.2018]
 */
export interface IVueSelectTemplateMethodsEntity extends IVueFieldTemplateMethodsEntity {
  onSelect(option: IMenuItemEntity): void;
  getOptions(): ISelectOptionEntity[];
}
