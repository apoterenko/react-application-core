import {
  IDisplayValueWrapper,
  AnyT,
  IFullWrapper,
} from '../../../definitions.interface';
import { ICrossPlatformField } from '../../../entities-definitions.interface';
import { IVueValue$Wrapper, VueAccessorsT } from '../../../vue-definitions.interface';
import { IVueComponent } from '../../../vue-entities-definitions.interface';
import { IVueBaseProps } from '../../base/vue-index';

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldTemplateComputedEntity extends VueAccessorsT<IVueValue$Wrapper> {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldInputListenersEntity {
  click?(): void;
}

/**
 * @stable [18.11.2018]
 */
export interface IVueFieldState extends IDisplayValueWrapper {
}

/**
 * @stable [21.12.2018]
 */
export interface IVueFieldProps extends IVueBaseProps,
                                        IFullWrapper {
}

/**
 * @stable [28.11.2018]
 */
export interface IVueField extends ICrossPlatformField,
                                   IVueComponent,
                                   IVueFieldTemplateMethodsEntity {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldTemplateMethodsEntity {
  getValue?(): AnyT;
  getInputBindings?(): Partial<HTMLInputElement>;
  getInputListeners?(): IVueFieldInputListenersEntity;
  isInputWrapperFull?(): boolean;
  isFieldFull?(): boolean;
  getFieldClassName?(): string;
  getInputWrapperClassName?(): string;
}

/**
 * @stable [28.11.2018]
 */
export const VUE_FIELD_CHANGE_EVENT = 'change';
