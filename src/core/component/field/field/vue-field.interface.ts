import { IDisplayValueWrapper, AnyT } from '../../../definitions.interface';
import { ICrossPlatformField } from '../../../entities-definitions.interface';
import { IVueValue$Wrapper, VueAccessorsT } from '../../../vue-definitions.interface';
import { IVueComponent } from '../../../vue-entities-definitions.interface';

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
export interface IVueFieldStateEntity extends IDisplayValueWrapper {
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
