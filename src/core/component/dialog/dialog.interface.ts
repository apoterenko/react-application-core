import {
  IAcceptDisabledWrapper,
  IAcceptMessageWrapper,
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
  IGenericDialogEntity,
  IUniversalComponentEntity,
  IUniversalDialog,
} from '../../definition';

/**
 * @stable [17.05.2018]
 */
export interface IUniversalDialogProps
  extends IGenericDialogEntity,
    IUniversalComponentEntity,
    ICloseDisabledWrapper,
    IAcceptDisabledWrapper,
    IAcceptMessageWrapper,
    ICloseMessageWrapper,
    IOnCloseWrapper,
    IOnDeactivateWrapper<() => void>,
    IOnAcceptWrapper {
}

/**
 * @stable [30.06.2018]
 */
export interface IDialogProps
  extends IComponentProps,
    IUniversalDialogProps {
}

export interface IUniversalDialog2<TProps extends IUniversalDialogProps = IUniversalDialogProps, TState = {}>
  extends IUniversalDialog<TProps, TState>,
          IIsOpenWrapper,
          IOnDeactivateWrapper<() => void>,
          IOnCloseWrapper,
          ICloseWrapper<() => void>,
          IOnAcceptWrapper {
}

/**
 * @stable [04.10.2018]
 */
export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  open(): void;
  close(): void;
}
