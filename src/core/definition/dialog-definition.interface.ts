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
  IExtraActionsWrapper,
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
    IExtraActionsWrapper<JSX.Element>,
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
  DIALOG_ACTIONS = 'rac-dialog__actions',
  DIALOG_BODY = 'rac-dialog__body',
  DIALOG_BODY_CONTENT = 'rac-dialog__body-content',
  DIALOG_BODY_CONTENT_WRAPPER = 'rac-dialog__body-content-wrapper',
  DIALOG_BODY_TITLE = 'rac-dialog__body-title',
  DIALOG_EXTRA_ACTIONS = 'rac-dialog__extra-actions',
  INLINE_DIALOG = 'rac-inline-dialog',
  MENU_DIALOG = 'rac-menu-dialog',
  MODAL_DIALOG = 'rac-modal-dialog',
  PLACE_DIALOG = 'rac-place-dialog',
  PLACE_DIALOG_TITLE = 'rac-place-dialog__title',
  PREVIEW_DIALOG = 'rac-preview-dialog',
}
