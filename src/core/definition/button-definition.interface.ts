import {
  IButtonConfigurationWrapper,
  IDecoratedWrapper,
  IDisabledWrapper,
  IErrorMessageWrapper,
  IFullWrapper,
  IIconLeftAlignedWrapper,
  IIconWrapper,
  IMiniWrapper,
  IOnClickWrapper,
  IOnMouseEnterWrapper,
  IOnMouseLeaveWrapper,
  IOutlinedWrapper,
  IProgressMessageWrapper,
  IProgressWrapper,
  IRaisedWrapper,
  ITextWrapper,
  ITouchedWrapper,
  IToWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @generic-entity
 * @stable [02.02.2020]
 */
export interface IGenericBaseButtonEntity // TODO ?
  extends IDisabledWrapper {
}

/**
 * @generic-entity
 * @stable [13.02.2019]
 */
export interface IGenericButtonEntity
  extends IGenericBaseButtonEntity,
    IDecoratedWrapper,
    IErrorEntity,
    IErrorMessageWrapper,
    IFullWrapper,
    IIconLeftAlignedWrapper,
    IIconWrapper<string | boolean>,
    IMiniWrapper,
    IOnClickWrapper,
    IOnMouseEnterWrapper,
    IOnMouseLeaveWrapper,
    IOutlinedWrapper,
    IProgressMessageWrapper,
    IProgressWrapper,
    IRaisedWrapper,
    ITextWrapper,
    ITouchedWrapper,
    IToWrapper,
    ITypeWrapper<'button' | 'submit' | 'reset'> {
}

/**
 * @props
 * @stable [27.09.2019]
 */
export interface IButtonProps
  extends IGenericComponentProps,
    IGenericButtonEntity {
}

/**
 * @configuration-entity
 * @stable [02.08.2020]
 */
export interface IConfigurationButtonEntity<TProps = IButtonProps>
  extends IButtonConfigurationWrapper<TProps> {
}

/**
 * @classes
 * @stable [26.03.2020]
 */
export enum ButtonClassesEnum {
  BUTTON = 'rac-button',
  BUTTON_CONTENT = 'rac-button__content',
  BUTTON_DECORATED = 'rac-button-decorated',
  BUTTON_FILLED = 'rac-button-filled',
  BUTTON_MINI = 'rac-button-mini',
  BUTTON_NOT_FILLED = 'rac-button-not-filled',
  BUTTON_OUTLINED = 'rac-button-outlined',
  BUTTON_RAISED = 'rac-button-raised',
  FULL_BUTTON = 'rac-full-button',
}
