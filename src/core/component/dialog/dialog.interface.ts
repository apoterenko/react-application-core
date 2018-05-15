import { INativeMaterialComponent } from '../../component/material';
import { IMessageWrapper } from '../../definitions.interface';
import { IComponentEntity, IComponent } from '../../entities-definitions.interface';

export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  show(): void;
}

export interface IDialog<TInternalProps extends IDialogInternalProps> extends IComponent<TInternalProps, {}> {
  activate(): void;
}

export type DialogT = IDialog<IDialogInternalProps>;

export interface IDialogInternalProps extends IComponentEntity,
                                              IMessageWrapper {
  closeMessage?: string;
  acceptMessage?: string;
  acceptDisabled?: boolean;
  closeDisabled?: boolean;
  canClose?: boolean;
  canAccept?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
