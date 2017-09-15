import { FunctionT } from 'core/util';
import { IBaseComponent, IBaseComponentInternalProps } from 'core/component/base';
import { INativeMaterialComponent } from 'core/component/material';
import { EntityIdT } from 'core/definition.interface';

export interface IMenuInternalState {
}

export interface IMenuInternalProps extends IBaseComponentInternalProps {
  options: IMenuOption[];
  onSelect?(option: IMenuOption): void;
}

export interface INativeMaterialMenuComponent extends INativeMaterialComponent {
  open: boolean;
  show(): FunctionT;
}

export interface IMenu extends IBaseComponent<IMenuInternalProps, IMenuInternalState> {
  opened: boolean;
  show(): void;
  hide(): void;
  activate(index: number);
}

export interface IMenuOption {
  value: EntityIdT;
  label?: string;
  disabled?: boolean;
}
