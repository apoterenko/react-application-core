import { INativeMaterialComponent } from 'core/component/material';

export interface INativeMaterialRippleComponent extends INativeMaterialComponent {
  activate(): void;
}

export interface IRippleComponentInternalProps {
  activated: boolean;
}
