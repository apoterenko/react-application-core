import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponentInternalProps } from '../../component/base';

export interface INativeMaterialDrawerComponent extends INativeMaterialComponent {
  open: boolean;
}

export interface IDrawerInternalProps extends IBaseComponentInternalProps {
  opened: boolean;
}
