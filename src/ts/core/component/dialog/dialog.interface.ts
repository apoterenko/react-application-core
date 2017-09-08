import { INativeMaterialComponent } from 'core/component/material';
import { IBaseComponent } from 'core/component/base';

export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  show(): void;
  listen(type: string, callback: Function);
}

export interface IDialog<TInternalProps extends IDialogInternalProps, TInternalState>
    extends IBaseComponent<TInternalProps, TInternalState> {
  activate(): void;
}

export interface IDialogInternalProps {
  title?: string;
  message?: string;
  closeMessage?: string;
  acceptMessage?: string;
  onAccept?(): void;
  onClose?(): void;
  canClose?: boolean;
  canAccept?: boolean;
}
