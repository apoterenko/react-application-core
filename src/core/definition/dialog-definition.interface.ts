import {
  IAcceptableWrapper,
  IAcceptDisabledWrapper,
  IAcceptTextWrapper,
  IAcceptWrapper,
  IActivateWrapper,
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
} from '../definitions.interface';
import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @stable [03.10.2019]
 */
export interface IGenericDialogEntity
  extends IAcceptableWrapper,
    IAcceptDisabledWrapper,
    IAcceptTextWrapper,
    ICheckScrimWrapper,
    IClosableWrapper,
    ICloseDisabledWrapper,
    ICloseTextWrapper {
}

/**
 * @stable [06.01.2020]
 */
export interface IBehavioralDialogEntity
  extends IGenericDialogEntity,
    IOnAcceptWrapper,
    IOnActivateWrapper,
    IOnCloseWrapper,
    IOnDeactivateWrapper {
}

/**
 * @stable [05.01.2020]
 */
export interface IActivateDialogConfigEntity
  extends IOnActivateWrapper,
    IOnDeactivateWrapper {
}

/**
 * @stable [03.10.2019]
 */
export interface IDialog<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IComponent<TProps, TState>,
    IAcceptWrapper,
    IActivateWrapper<IActivateDialogConfigEntity> {
}

/**
 * @stable [06.01.2020]
 */
export interface IDialogProps
  extends IComponentProps,
    IBehavioralDialogEntity {
}

/**
 * @stable [06.01.2020]
 */
export interface IDialogState
  extends IOpenedWrapper {
}

/**
 * @stable [15.01.2020]
 */
export interface IDialogConfigurationWrapperEntity<TProps extends IDialogProps = IDialogProps>
  extends IDialogConfigurationWrapper<TProps> {
}
