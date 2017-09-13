import { FunctionT } from 'core/util';
import { IMenuOption } from 'core/component/menu';

import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
  INativeMaterialTextfieldComponent,
} from '../textfield/basic-textfield.interface';

export interface ISelectInternalState extends IBasicTextFieldInternalState {
}

export interface ISelectInternalProps extends IBasicTextFieldInternalProps {
  options: ISelectOption[];
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
