import {
  IDisplayValueWrapper,
  AnyT,
  IFullWrapper,
  ILabelWrapper,
  IDisplayNameWrapper,
  IUseLocalizationWrapper,
  IIconWrapper,
  IAutoFocusWrapper,
  IFloatLabelWrapper,
  ITypeWrapper,
} from '../../../definitions.interface';
import { ICrossPlatformField } from '../../../entities-definitions.interface';
import { IVueValue$Wrapper, VueAccessorsT } from '../../../vue-definitions.interface';
import { IVueComponent } from '../../../vue-entities-definitions.interface';
import { IVueBaseProps } from '../../base/vue-index';
import { IGenericFieldEntity } from '../../../definition';

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
export interface IVueFieldProps
  extends IVueBaseProps,
    IGenericFieldEntity,
    ILabelWrapper,
    IIconWrapper,
    IAutoFocusWrapper,
    IDisplayNameWrapper,
    IUseLocalizationWrapper,
    IFullWrapper,
    ITypeWrapper,
    IFloatLabelWrapper {
}

/**
 * @stable [28.11.2018]
 */
export interface IVueField extends ICrossPlatformField,
                                   IVueComponent,
                                   IVueFieldTemplateMethods {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueFieldTemplateMethods {
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
