import {
  IAcceptableWrapper,
  IAcceptDisabledWrapper,
  IAcceptTextWrapper,
  IAcceptWrapper,
  IActivateWrapper,
  IAnchorElementWrapper,
  ICheckScrimWrapper,
  IClosableWrapper,
  ICloseDisabledWrapper,
  ICloseTextWrapper,
  IDialogConfigurationWrapper,
  IOnAcceptWrapper,
  IOnActivateWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
  IOpenedWrapper,
  IWidthWrapper,
} from '../definitions.interface';
import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IDomPositionConfigurationEntity } from './dom-definition.interface';

/**
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericBaseDialogEntity
  extends IAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IDomPositionConfigurationEntity,
    IWidthWrapper<number | (() => number)> {
}

/**
 * @generic-entity
 * @stable [21.10.2019]
 */
export interface IGenericDialogEntity
  extends IGenericBaseDialogEntity,
    IAcceptableWrapper,
    IAcceptDisabledWrapper,
    IAcceptTextWrapper,
    ICheckScrimWrapper,
    IClosableWrapper,
    ICloseDisabledWrapper,
    ICloseTextWrapper {
}

/**
 * @behavioral-entity
 * @stable [21.01.2020]
 */
export interface IBehavioralDialogEntity
  extends IOnAcceptWrapper,
    IOnActivateWrapper,
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
