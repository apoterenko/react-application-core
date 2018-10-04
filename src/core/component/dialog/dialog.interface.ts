import { INativeMaterialComponent } from '../material/material.interface';
import {
  IAcceptableWrapper,
  IClosableWrapper,
  IOnAcceptWrapper,
  IOnCloseWrapper,
  IShowWrapper,
  IMessageWrapper,
  IActivateWrapper,
  IAcceptDisabledWrapper,
  ICloseDisabledWrapper,
  IAcceptMessageWrapper,
  ICloseMessageWrapper,
  IIsOpenWrapper,
  IAutoWidthWrapper,
} from '../../definitions.interface';
import { IUniversalComponentEntity, IUniversalComponent } from '../../entities-definitions.interface';
import { IUniversalComponentConfiguration, IWebComponentConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogConfiguration extends IUniversalComponentConfiguration,
                                                       ICloseDisabledWrapper,
                                                       IAcceptDisabledWrapper,
                                                       IMessageWrapper,
                                                       IAcceptMessageWrapper,
                                                       ICloseMessageWrapper,
                                                       IOnCloseWrapper,
                                                       IOnAcceptWrapper,
                                                       IClosableWrapper,
                                                       IAcceptableWrapper,
                                                       IAutoWidthWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogProps extends IUniversalComponentEntity,
                                               IUniversalDialogConfiguration {
}

/**
 * @stable [30.06.2018]
 */
export interface IDialogProps extends IUniversalDialogProps,
                                      IWebComponentConfiguration {
}

/**
 * @stable [02.08.2018]
 */
export interface IUniversalDialog<TProps extends IUniversalDialogProps = IUniversalDialogProps, TState = {}>
  extends IUniversalComponent<TProps, TState>,
          IIsOpenWrapper,
          IActivateWrapper,
          IOnCloseWrapper,
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
