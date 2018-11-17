import {
  IVueValue$Wrapper,
  VueAccessorsT,
} from '../../../vue-definitions.interface';
import { IDisplayValueWrapper } from '../../../definitions.interface';

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldTemplateComputedEntity extends VueAccessorsT<IVueValue$Wrapper> {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldInputEventsEntity {
  click?(): void;
}

/**
 * @stable [18.11.2018]
 */
export interface IVueFieldStateEntity extends IDisplayValueWrapper {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldTemplateMethodsEntity {
  getInputBindings?(): Partial<HTMLInputElement>;
  getInputListeners?(): IVueFieldInputEventsEntity;
  isInputWrapperFull?(): boolean;
  isFieldFull?(): boolean;
  getFieldClassName?(): string;
}
