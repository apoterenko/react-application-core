import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponent } from '../../component/base';
import { IStringMessageWrapper } from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface INativeMaterialDialogComponent extends INativeMaterialComponent {
  show(): void;
}

export interface IDialog<TInternalProps extends IDialogInternalProps> extends IBaseComponent<TInternalProps, {}> {
  activate(): void;
}

export type DialogT = IDialog<IDialogInternalProps>;

export interface IDialogInternalProps extends IComponentEntity,
                                              IStringMessageWrapper {
  closeMessage?: string;
  acceptMessage?: string;
  acceptDisabled?: boolean;
  closeDisabled?: boolean;
  canClose?: boolean;
  canAccept?: boolean;
  onAccept?(): void;
  onClose?(): void;
}
