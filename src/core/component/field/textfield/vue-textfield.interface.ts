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

/**
 * @stable [21.01.2019]
 */
export interface IVueTextFieldProps extends IVueBaseTextFieldProps {
}

/**
 * @stable [06.01.2019]
 */
export const VUE_TEXT_FIELD_NAME = 'vue-text-field';
