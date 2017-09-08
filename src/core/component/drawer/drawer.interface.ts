import { INativeMaterialComponent } from 'core/component/material';
import { IBaseComponentInternalProps } from 'core/component/base';

export interface INativeMaterialDrawerComponent extends INativeMaterialComponent {
  open: boolean;
}

export interface IDrawerInternalProps extends IBaseComponentInternalProps {
  opened: boolean;
}
