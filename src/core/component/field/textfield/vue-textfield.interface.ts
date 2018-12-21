import {
  IVueFieldProps,
  IVueFieldTemplateMethods,
} from '../field/vue-index';

/**
 * @stable [21.12.2018]
 */
export interface IVueBaseTextFieldProps extends IVueFieldProps {
}

/**
 * @stable [22.12.2018]
 */
export interface IVueBaseTextFieldTemplateMethods extends IVueFieldTemplateMethods {
  onIconClick?(): void;
}
