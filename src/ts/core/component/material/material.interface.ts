import { ReactInstance } from 'react';

export interface IMaterialComponentFactory<TMaterialComponent extends IMaterialComponent> {
  attachTo(el: ReactInstance): TMaterialComponent;
}

export interface IMaterialComponent {
  destroy(): void;
}
