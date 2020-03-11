import {
  IAcceptableWrapper,
  IAcceptActionConfigurationWrapper,
  IAcceptDisabledWrapper,
  IAcceptTextWrapper,
  IAcceptWrapper,
  IActivateWrapper,
  IAnchorElementWrapper,
  ICheckModalWrapper,
  IClosableWrapper,
  ICloseActionConfigurationWrapper,
  ICloseDisabledWrapper,
  ICloseTextWrapper,
  IConfirmWrapper,
  IDefaultWrapper,
  IDialogConfigurationWrapper,
  IInlineWrapper,
  IOnAcceptWrapper,
  IOnActivateWrapper,
  IOnBeforeAcceptWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
  IOpenedWrapper,
  IScrollableWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IButtonProps } from './button-definition.interface';
import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IDomPositionConfigurationEntity } from './dom-definition.interface';
import { IFormExtendedEditableEntity } from './form-definition.interface';

/**
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericBaseDialogEntity
  extends IAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IDomPositionConfigurationEntity,
    IInlineWrapper,
    IWidthWrapper<number | (() => number)> {
}

/**
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericDialogEntity
  extends IGenericBaseDialogEntity,
    IAcceptableWrapper,
    IAcceptActionConfigurationWrapper<IButtonProps>,
    IAcceptDisabledWrapper,
    IAcceptTextWrapper,
    ICheckModalWrapper,
    IClosableWrapper,
    ICloseActionConfigurationWrapper<IButtonProps>,
    ICloseDisabledWrapper,
    ICloseTextWrapper,
    IConfirmWrapper,
    IDefaultWrapper,
    IScrollableWrapper {
}

/**
 * @behavioral-entity
 * @stable [21.01.2020]
 */
export interface IBehavioralDialogEntity
  extends IOnAcceptWrapper,
    IOnActivateWrapper,
    IOnBeforeAcceptWrapper,
    IOnCloseWrapper,
    IOnDeactivateWrapper {
}

/**
 * @config-entity
 * @stable [21.01.2020]
 */
export interface IActivateDialogConfigEntity
  extends IOnActivateWrapper,
    IOnDeactivateWrapper {
}

/**
 * @component
 * @stable [03.10.2019]
 */
export interface IDialog<TProps extends IComponentProps = IComponentProps, TState extends IDialogState = IDialogState>
  extends IComponent<TProps, TState>,
    IAcceptWrapper,
    IActivateWrapper<IActivateDialogConfigEntity> {
}

/**
 * @props
 * @stable [06.01.2020]
 */
export interface IDialogProps
  extends IComponentProps,
    IGenericDialogEntity,
    IBehavioralDialogEntity {
}

/**
 * @generic-state
 * @stable [22.01.2020]
 */
export interface IGenericDialogState
  extends IOpenedWrapper {
}

/**
 * @state
 * @stable [06.01.2020]
 */
export interface IDialogState
  extends IGenericDialogState {
}

/**
 * @configuration-entity
 * @stable [15.01.2020]
 */
export interface IDialogConfigurationEntity<TProps extends IDialogProps = IDialogProps>
  extends IDialogConfigurationWrapper<TProps> {
}

/**
 * @props
 * @stable [30.01.2020]
 */
export interface IUnsavedFormChangesDialogProps
  extends IDialogProps,
    IFormExtendedEditableEntity {
}

/**
 * @stable [11.03.2020]
 */
export enum DialogClassesEnum {
  CONFIRM_DIALOG = 'rac-confirm-dialog',
  DIALOG = 'rac-dialog',
  MODAL_DIALOG = 'rac-modal-dialog',
}
