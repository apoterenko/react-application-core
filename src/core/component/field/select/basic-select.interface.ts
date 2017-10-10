import { FunctionT } from '../../../util';
import { IMenuOption } from '../../../component/menu';
import { IFilterable } from '../../../definition.interface';

import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
  INativeMaterialBasicTextFieldComponent,
} from '../textfield';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  needOpenMenu?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IFilterable {
  options?: ISelectOption[];
  onEmptyOptions?(): void;
  onSelect?(option: ISelectOption): void;
}

export interface INativeMaterialSelectMenuComponent {
  show: FunctionT;
  hide: FunctionT;
  open: boolean;
}

export interface INativeMaterialSelectComponent extends INativeMaterialBasicTextFieldComponent {
  selectedOptions: Element[];
  menu_: INativeMaterialSelectMenuComponent;
}

export interface ISelectOption extends IMenuOption {
}
