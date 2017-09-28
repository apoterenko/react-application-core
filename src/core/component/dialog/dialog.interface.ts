import { FunctionT } from '../../util';
import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponent, IBaseComponentInternalProps } from '../../component/base';

export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  show(): void;
  listen(type: string, callback: FunctionT);
}

export interface IDialog<TInternalProps extends IDialogInternalProps>
    extends IBaseComponent<TInternalProps, {}> {
  activate(): void;
}

export interface IDialogInternalProps extends IBaseComponentInternalProps {
  title?: string;
  message?: string;
  closeMessage?: string;
  acceptMessage?: string;
  canClose?: boolean;
  canAccept?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
