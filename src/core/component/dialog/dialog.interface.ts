import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponent, IBaseComponentInternalProps } from '../../component/base';

export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  show(): void;
}

export interface IDialog<TInternalProps extends IDialogInternalProps> extends IBaseComponent<TInternalProps, {}> {
  activate(): void;
}

export type DialogT = IDialog<IDialogInternalProps>;

export interface IDialogInternalProps extends IBaseComponentInternalProps {
  closeMessage?: string;
  acceptMessage?: string;
  acceptDisabled?: boolean;
  closeDisabled?: boolean;
  canClose?: boolean;
  canAccept?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
