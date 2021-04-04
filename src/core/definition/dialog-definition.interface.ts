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
  IClosableOverlayWrapper,
  IOverlayWrapper,
  IProgressWrapper,
  IScrollableWrapper,
  IWideWrapper,
  IWidthWrapper,
  IActionsFactoryWrapper,
} from '../definitions.interface';
import { IButtonProps } from './button-definition.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IDomPositionConfigurationEntity } from './dom-definition.interface';

/**
 * @presets-entity
 * @stable [11.05.2020]
 */
export interface IPresetsBaseDialogEntity
  extends IAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IDomPositionConfigurationEntity,
    IInlineWrapper,
    IWidthWrapper<number | (() => number)> {
}

/**
 * @presets-entity
 * @stable [11.05.2020]
 */
export interface IPresetsDialogEntity
  extends IPresetsBaseDialogEntity,
    IAcceptableWrapper,
    IAcceptActionConfigurationWrapper<IButtonProps>,
    IAcceptDisabledWrapper,
    IAcceptTextWrapper,
    IActionsFactoryWrapper<(acceptAction: JSX.Element, closeAction: JSX.Element) => JSX.Element>,     /* @stable [25.03.2021] */
    ICheckModalWrapper,   // Check more than one dialog at a time
    IClosableOverlayWrapper,
    IClosableWrapper,
    ICloseActionConfigurationWrapper<IButtonProps>,
    ICloseDisabledWrapper,
    ICloseTextWrapper,
    IConfirmWrapper,
    IDefaultWrapper,
    IExtraActionsWrapper<JSX.Element>,
    IOnAcceptWrapper,
    IOnActivateWrapper,
    IOnBeforeAcceptWrapper,
    IOnCloseWrapper,
    IOnDeactivateWrapper,
    IOverlayWrapper,
    IProgressWrapper,
    IScrollableWrapper,
    IWideWrapper {
}

/**
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericDialogEntity
  extends IPresetsDialogEntity {
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
 * @stable [04.04.2021]
 */
export interface IDialogConfigurationEntity<TProps = IDialogProps>
  extends IDialogConfigurationWrapper<TProps> {
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
  DIALOG_PROGRESS_ICON = 'rac-dialog__progress-icon',
  INLINE_DIALOG = 'rac-inline-dialog',
  MODAL_DIALOG = 'rac-modal-dialog',
  NOT_ANCHORED_DIALOG = 'rac-not-anchored-dialog',
  NOT_INLINE_DIALOG = 'rac-not-inline-dialog',
  NOT_TRANSPARENT_DIALOG = 'rac-not-transparent-dialog',
  OVERLAY_CLOSE_ICON = 'rac-dialog__overlay-close-icon',
  OVERLAY_DIALOG = 'rac-overlay-dialog',
  OVERLAY_FILTER = 'rac-overlay-filter',
  PLACE_DIALOG = 'rac-place-dialog',
  PLACE_DIALOG_TITLE = 'rac-place-dialog__title',
  PREVIEW_DIALOG = 'rac-preview-dialog',
  PROGRESS_DIALOG = 'rac-progress-dialog',
  TRANSPARENT_DIALOG = 'rac-transparent-dialog',
  WIDE_DIALOG = 'rac-wide-dialog',
}
