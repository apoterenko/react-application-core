import {
  IAcceptableWrapper,
  IAcceptDisabledWrapper,
  IAcceptMessageWrapper,
  IActivateWrapper,
  IClosableWrapper,
  ICloseDisabledWrapper,
  ICloseMessageWrapper,
  ICloseWrapper,
  IIsOpenWrapper,
  IOnAcceptWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
} from '../../definitions.interface';
import { IUniversalComponent, INativeMaterialComponent } from '../../entities-definitions.interface';
import { IReactComponentConfiguration } from '../../configurations-definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogConfiguration extends IReactComponentConfiguration,
                                                       ICloseDisabledWrapper,
                                                       IAcceptDisabledWrapper,
                                                       IAcceptMessageWrapper,
                                                       ICloseMessageWrapper,
                                                       IOnCloseWrapper,
                                                       IOnDeactivateWrapper<() => void>,
                                                       IOnAcceptWrapper,
                                                       IClosableWrapper,
                                                       IAcceptableWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogProps extends IUniversalDialogConfiguration {
}

/**
 * @stable [30.06.2018]
 */
export interface IDialogProps extends IComponentProps,
  IUniversalDialogProps {
}

export interface IUniversalDialog<TProps extends IUniversalDialogProps = IUniversalDialogProps, TState = {}>
  extends IUniversalComponent<TProps, TState>,
          IIsOpenWrapper<() => boolean>,
          IActivateWrapper<() => void>,
          IOnDeactivateWrapper<() => void>,
          IOnCloseWrapper,
          IOnCloseWrapper,
          ICloseWrapper<() => void>,
          IOnAcceptWrapper,
          IClosableWrapper,
          IAcceptableWrapper {
}

/**
 * @stable [04.10.2018]
 */
export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  open(): void;
  close(): void;
}
