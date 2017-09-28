import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponentInternalProps } from '../../component/base';

export interface INativeMaterialRippleComponent extends INativeMaterialComponent {
  activate(): void;
}

export interface IRippleInternalProps extends IBaseComponentInternalProps {
  active: boolean;
}
