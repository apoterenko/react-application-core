import { IMaterialComponent } from '../material/material.interface';

export interface IMaterialRippleComponent extends IMaterialComponent {
  activate(): void;
}

export interface IRippleComponentInternalProps {
  activated: boolean;
}
