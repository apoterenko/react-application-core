import { INativeMaterialComponent } from 'core/component/material';
import { IBaseComponentInternalProps } from 'core/component/base';

export interface INativeMaterialRippleComponent extends INativeMaterialComponent {
  activate(): void;
}

export interface IRippleInternalProps extends IBaseComponentInternalProps {
  active: boolean;
}
