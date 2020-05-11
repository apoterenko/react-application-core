import {
  IAcceptableWrapper,
  IAcceptActionConfigurationWrapper,
  IAcceptDisabledWrapper,
  IAcceptTextWrapper,
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
  IOverlayWrapper,
  IScrollableWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IButtonProps } from './button-definition.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IDomPositionConfigurationEntity } from './dom-definition.interface';
import { IExtendedFormEntity } from './form-definition.interface';
import { IProxyContainerEntity } from './container-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

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
 * @presets-entity
 * @stable [10.05.2020]
 */
export interface IPresetsDialogEntity
  extends IAcceptableWrapper,
    IClosableWrapper,
    IConfirmWrapper,
    IDefaultWrapper,
    IOnAcceptWrapper,
    IOnActivateWrapper,
    IOnBeforeAcceptWrapper,
    IOnCloseWrapper,
    IOnDeactivateWrapper,
    IOverlayWrapper,
    IScrollableWrapper {
}

/**
 * TODO Presets
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericDialogEntity
  extends IGenericBaseDialogEntity,
    IPresetsDialogEntity,
    IAcceptActionConfigurationWrapper<IButtonProps>,
    IAcceptDisabledWrapper,
    IAcceptTextWrapper,
    ICheckModalWrapper,
    ICloseActionConfigurationWrapper<IButtonProps>,
    ICloseDisabledWrapper,
    ICloseTextWrapper,
    IExtraActionsWrapper<JSX.Element> {
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
export interface IDialog<TProps extends IGenericComponentProps = IGenericComponentProps,
                         TState extends IDialogState = IDialogState>
  extends IGenericComponent<TProps, TState>,
    IActivateWrapper<IActivateDialogConfigEntity> {
}

/**
 * @props
 * @stable [06.01.2020]
 */
export interface IDialogProps
  extends IGenericComponentProps,
    IGenericDialogEntity {
}

/**
 * @state
 * @stable [06.01.2020]
 */
export interface IDialogState
  extends IOpenedWrapper {
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
    IExtendedFormEntity {
}

/**
 * @props
 * @stable [05.04.2020]
 */
export interface IUnsavedFormChangesDialogContainerProps
  extends IGenericContainerProps,
    IProxyContainerEntity,
    IDialogConfigurationEntity<IUnsavedFormChangesDialogProps> {
}

/**
 * @stable [11.03.2020]
 */
export enum DialogClassesEnum {
  ANCHORED_DIALOG = 'rac-anchored-dialog',
  CONFIRM_DIALOG = 'rac-confirm-dialog',
  DEFAULT_DIALOG = 'rac-default-dialog',
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
  NOT_ANCHORED_DIALOG = 'rac-not-anchored-dialog',
  NOT_TRANSPARENT_DIALOG = 'rac-not-transparent-dialog',
  OVERLAY_DIALOG = 'rac-overlay-dialog',
  OVERLAY_FILTER = 'rac-overlay-filter',
  PLACE_DIALOG = 'rac-place-dialog',
  PLACE_DIALOG_TITLE = 'rac-place-dialog__title',
  PREVIEW_DIALOG = 'rac-preview-dialog',
  TRANSPARENT_DIALOG = 'rac-transparent-dialog',
}
