import { FunctionT } from 'core/util';
import { IFieldInternalState, IFieldInternalProps } from 'core/component/field/field';
import { INativeMaterialComponent } from 'core/component/material';
import { IMenuOption } from 'core/component/menu';

import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
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

export interface INativeMaterialSelectComponent extends INativeMaterialComponent {
  selectedOptions: Element[];
  menu_: INativeMaterialSelectMenuComponent;
}

export interface ISelectOption extends IMenuOption {
}
