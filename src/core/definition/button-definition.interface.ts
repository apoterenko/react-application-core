import {
  IButtonConfigurationWrapper,
  IDecoratedWrapper,
  IDisabledWrapper,
  IErrorMessageWrapper,
  IFullWrapper,
  IIconRightWrapper,
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
 * @generic-entity
 * @stable [13.02.2019]
 */
export interface IGenericButtonEntity
  extends IDecoratedWrapper,
    IDisabledWrapper,
    IErrorEntity,
    IErrorMessageWrapper,
    IFullWrapper,
    IIconRightWrapper,
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
 * @behavioral-entity
 * @stable [24.01.2020]
 */
export interface IBehavioralButtonEntity
  extends IOnClickWrapper {
}

/**
 * @props
 * @stable [27.09.2019]
 */
export interface IButtonProps
  extends IComponentProps,
    IGenericButtonEntity,
    IBehavioralButtonEntity {
}

/**
 * @configuration-entity
 * @stable [24.01.2020]
 */
export interface IButtonConfigurationEntity
  extends IButtonConfigurationWrapper<IButtonProps> {
}

/**
 * TODO
 */
export const DEFAULT_FLEX_BUTTON_CLASS_NAMES = Object.freeze([
  'rac-button',
  'rac-flex',
  'rac-flex-row',
  'rac-flex-align-items-center'
]);
