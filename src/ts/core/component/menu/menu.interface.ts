import { FunctionT } from 'core/util';
import { AnyT } from 'core/definition.interface';
import { IBaseComponent } from 'core/component/base';
import { IFieldInternalState, IFieldInternalProps } from 'core/component/field/field';
import { INativeMaterialComponent } from 'core/component/material';

export interface IMenuInternalState extends IFieldInternalState {
}

export interface IMenuInternalProps extends IFieldInternalProps {
  options: IMenuOption[];
  onSelect?(option: IMenuOption): void;
}

export interface INativeMaterialMenuComponent extends INativeMaterialComponent {
  open: boolean;
  show(): FunctionT;
}

export interface IMenu extends IBaseComponent<IMenuInternalProps, IMenuInternalState> {
  show(): void;
}

export interface IMenuOption {
  value: string|number;
  label?: string;
  disabled?: boolean;
}
