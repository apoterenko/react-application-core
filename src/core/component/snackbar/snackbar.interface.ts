import { FunctionT } from 'core/util';
import { IBaseComponentInternalProps } from 'core/component/base';
import { INativeMaterialComponent } from 'core/component/material';

export interface IMaterialSnackbarComponentOptions {
  message?: string;
  timeout?: number;
  actionHandler?: FunctionT;
  actionText?: string;
}

export interface INativeMaterialSnackbarComponent extends INativeMaterialComponent {
  show(options: IMaterialSnackbarComponentOptions): void;
}

export interface ISnackbarInternalProps
    extends IMaterialSnackbarComponentOptions, IBaseComponentInternalProps {
}
