import { FunctionT } from '../../util';
import { INativeMaterialComponent } from '../../component/material';
import { IInfoWrapper } from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IMaterialSnackbarComponentOptions {
  message?: string;
  timeout?: number;
  actionHandler?: FunctionT;
  actionText?: string;
}

export interface INativeMaterialSnackbarComponent extends INativeMaterialComponent {
  show(options: IMaterialSnackbarComponentOptions): void;
}

export interface ISnackbarInternalProps extends IMaterialSnackbarComponentOptions,
                                                IComponentEntity,
                                                IInfoWrapper<boolean> {
  afterShow?(): void;
}
