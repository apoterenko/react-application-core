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
} from '../../definitions.interface';
import { IUniversalComponentEntity, IUniversalComponent } from '../../entities-definitions.interface';
import { IUniversalComponentConfiguration } from '../../configurations-definitions.interface';

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
                                                       IAcceptableWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogProps extends IUniversalComponentEntity,
                                               IUniversalDialogConfiguration {
}

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialog<TProps extends IUniversalDialogProps = IUniversalDialogProps>
  extends IUniversalComponent<TProps>,
          IActivateWrapper,
          IOnCloseWrapper,
          IOnAcceptWrapper,
          IClosableWrapper,
          IAcceptableWrapper {
}

/**
 * @stable [17.05.2018]
 */
export interface INativeMaterialDialogComponent extends INativeMaterialComponent,
                                                        IShowWrapper {
}
