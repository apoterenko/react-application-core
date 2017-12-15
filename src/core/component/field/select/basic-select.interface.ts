import { IMenuOption } from '../../../component/menu';
import { IFilterable, INamedEntity, IRenderable } from '../../../definition.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  emptyOptions?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IRenderable,
                                                   IFilterable {
  options?: ISelectOption[];
  onEmptyOptions?(): void;
  onOptionsLoad?(loadedOptions: ISelectOption[]): void;
  onSelect?(option: ISelectOption): void;
}

export interface ISelectOption extends IMenuOption {
}

export function toSelectOptions(data: INamedEntity[]): ISelectOption[] {
  return data
      ? data.map((rawItem) => ({value: rawItem.id, label: rawItem.name}))
      : null;
}
