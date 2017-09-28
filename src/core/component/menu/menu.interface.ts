import { FunctionT } from '../../util';
import { IBaseComponent, IBaseComponentInternalProps } from '../../component/base';
import { INativeMaterialComponent } from '../../component/material';
import { EntityIdT, IFilterable } from '../../definition.interface';

export interface IMenuInternalState {
  filter: string;
}

export interface IMenuInternalProps extends IBaseComponentInternalProps,
                                            IFilterable {
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
