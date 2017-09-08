import { FunctionT } from 'core/util';
import { IFieldInternalState, IFieldInternalProps } from 'core/component/field/field';
import { INativeMaterialComponent } from 'core/component/material';
import { IMenuOption } from 'core/component/menu';

export interface ISelectInternalState extends IFieldInternalState {
}

export interface ISelectInternalProps extends IFieldInternalProps {
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
