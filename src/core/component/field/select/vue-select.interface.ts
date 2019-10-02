import {
  IBindDictionaryWrapper,
  IDictionaryParamsWrapper,
  IKeyValue,
  IMenuPropsWrapper,
} from '../../../definitions.interface';
import {
  IMenuItemEntity,
  ISelectOptionEntity,
} from '../../../definition';
import { IVueBaseTextFieldTemplateMethods } from '../textfield/vue-index';
import { IVueBaseTextFieldProps } from '../textfield/vue-index';
import { IVueMenuProps } from '../../menu/vue-index';

/**
 * @stable [22.12.2018]
 */
export interface IVueSelectProps extends IVueBaseTextFieldProps,
                                         IBindDictionaryWrapper,
                                         IDictionaryParamsWrapper<IKeyValue | (() => IKeyValue)>,
                                         IMenuPropsWrapper<IVueMenuProps> {
}

/**
 * @stable [20.12.2018]
 */
export type VueSelectFilterT = (option: ISelectOptionEntity, query: string) => boolean;

/**
 * @stable [17.11.2018]
 */
export interface IVueSelectTemplateMethods extends IVueBaseTextFieldTemplateMethods {
  onSelect?(option: IMenuItemEntity): void;
  getMenuBindings?(): IVueMenuProps;
}

/**
 * @stable [06.01.2018]
 */
export const VUE_SELECT_NAME = 'vue-select';
