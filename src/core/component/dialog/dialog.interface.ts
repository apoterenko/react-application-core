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
import { INativeMaterialComponent } from '../../entities-definitions.interface';
import {
  IComponentProps,
  IUniversalComponent,
  IUniversalComponentEntity,
} from '../../definition';

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogProps
  extends IUniversalComponentEntity,
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
 * @stable [30.06.2018]
 */
export interface IDialogProps extends IComponentProps,
  IUniversalDialogProps {
}

export interface IUniversalDialog<TProps extends IUniversalDialogProps = IUniversalDialogProps, TState = {}>
  extends IUniversalComponent<TProps, TState>,
          IIsOpenWrapper,
          IActivateWrapper<() => void>,
          IOnDeactivateWrapper<() => void>,
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
