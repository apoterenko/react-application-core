import { ReactInstance } from 'react';

import { FunctionT } from '../../util';
import { IKeyValue, IDefaultActivateWrapper } from '../../definition.interface';

export interface IMaterialComponentFactory<TNativeMaterialComponent extends INativeMaterialComponent> {
  attachTo(el: ReactInstance): TNativeMaterialComponent;
}

export interface INativeMaterialComponent {
  foundation_: INativeMaterialDefaultFoundation;
  listen(type: string, callback: FunctionT);
  unlisten(type: string, callback: FunctionT);
  destroy(): void;
}

export interface INativeMaterialDefaultFoundation extends IKeyValue {
  adapter_: IKeyValue;
}

export interface INativeMaterialCheckboxComponent extends INativeMaterialComponent {
  checked: boolean;
}

export interface IListItemNativeMaterialComponent extends INativeMaterialComponent,
                                                          IDefaultActivateWrapper {
}
