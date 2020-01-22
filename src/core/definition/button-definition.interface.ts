import {
  IButtonConfigurationWrapper,
  IDisabledWrapper,
  IErrorMessageWrapper,
  IFullWrapper,
  IIconWrapper,
  IMiniWrapper,
  IOnClickWrapper,
  IOutlinedWrapper,
  IProgressMessageWrapper,
  IProgressWrapper,
  IRaisedWrapper,
  IRippledWrapper,
  ITextWrapper,
  ITouchedWrapper,
  IToWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @cross-platform
 * @stable [13.02.2019]
 */
export interface IGenericButtonEntity
  extends IDisabledWrapper,
    IErrorEntity,
    IErrorMessageWrapper,
    IFullWrapper,
    IIconWrapper<string | boolean>,
    IMiniWrapper,
    IOutlinedWrapper,
    IProgressMessageWrapper,
    IProgressWrapper,
    IRaisedWrapper,
    IRippledWrapper,
    ITextWrapper,
    ITouchedWrapper,
    IToWrapper,
    ITypeWrapper<'button' | 'submit' | 'reset'> {
}

/**
 * @stable [27.09.2019]
 */
export interface IButtonEntity
  extends IGenericButtonEntity,
    IOnClickWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IButtonProps
  extends IComponentProps,
    IButtonEntity {
}

/**
 * @stable [26.10.2019]
 */
export interface IButtonConfigurationWrapperEntity
  extends IButtonConfigurationWrapper<IButtonProps> {
}

/**
 * @stable [16.10.2019]
 */
export const DEFAULT_FLEX_BUTTON_CLASS_NAMES = Object.freeze([
  'rac-button',
  'rac-flex',
  'rac-flex-row',
  'rac-flex-align-items-center'
]);
