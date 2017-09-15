import { FunctionT } from 'core/util';
import { IMenuOption } from 'core/component/menu';

import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
  INativeMaterialTextfieldComponent,
} from 'core/component/field';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  needOpenMenu?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps {
  options?: ISelectOption[];
  onEmptyOptions?(): void;
}

export interface INativeMaterialSelectMenuComponent {
  show: FunctionT;
  hide: FunctionT;
  open: boolean;
}

export interface INativeMaterialSelectComponent extends INativeMaterialTextfieldComponent {
  selectedOptions: Element[];
  menu_: INativeMaterialSelectMenuComponent;
}

export interface ISelectOption extends IMenuOption {
}
