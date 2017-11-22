import { FunctionT } from '../../util';
import { IBaseComponentInternalProps } from '../../component/base';
import { INativeMaterialComponent } from '../../component/material';
import { IInfoable } from '../../definition.interface';

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
                                                IBaseComponentInternalProps,
                                                IInfoable<boolean> {
  afterShow?(): void;
}
