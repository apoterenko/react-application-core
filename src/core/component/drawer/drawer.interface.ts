import { INativeMaterialComponent } from '../material';
import { IBaseComponentInternalProps } from '../base';

export interface INativeMaterialDrawerComponent extends INativeMaterialComponent {
  open: boolean;
}

export interface IDrawerInternalProps extends IBaseComponentInternalProps {
  opened: boolean;
}
