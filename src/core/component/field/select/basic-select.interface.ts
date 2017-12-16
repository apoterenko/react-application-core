import { IMenuOption } from '../../../component/menu';
import {
  IFilterable,
  INamedEntity,
  IRenderable,
  ITemplateable,
} from '../../../definition.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  emptyOptions?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IRenderable<SelectOptionT>,
                                                   ITemplateable<SelectOptionT>,
                                                   IFilterable {
  options?: SelectOptionT[];
  onEmptyOptions?(): void;
  onOptionsLoad?(loadedOptions: SelectOptionT[]): void;
  onSelect?(option: SelectOptionT): void;
}

export interface ISelectOption<TRawData extends INamedEntity> extends IMenuOption<TRawData> {
}

export function toSelectOptions<TRawData extends INamedEntity>(data: INamedEntity[]): SelectOptionT[] {
  return data
      ? data.map((rawItem: TRawData): SelectOptionT => ({
          value: rawItem.id,
          label: rawItem.name,
          rawData: rawItem,
      }))
      : null;
}

export type SelectOptionT = ISelectOption<INamedEntity>;
