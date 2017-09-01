import { ReactInstance } from 'react';

import { AnyT } from 'core/definition.interface';

export interface IMaterialComponentFactory<TNativeMaterialComponent extends INativeMaterialComponent> {
  attachTo(el: ReactInstance): TNativeMaterialComponent;
}

export interface INativeMaterialComponent {
  destroy(): void;
  getDefaultFoundation(): AnyT;
}
