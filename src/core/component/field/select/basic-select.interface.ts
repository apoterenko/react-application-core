import { IMenuOption } from '../../../component/menu';
import {
  INamedEntity,
  IRendererWrapper,
} from '../../../definition.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield';
import { orNull } from '../../../util';
import { IMenuOptions } from '../../menu';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  emptyOptions?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IRendererWrapper<SelectOptionT> {
  menuOptions?: IMenuOptions;
  forceAll?: boolean;
  options?: SelectOptionT[];
  onOptionsLoad?(loadedOptions: SelectOptionT[]): void;
  onSelect?(option: SelectOptionT): void;
}

export interface ISelectOption<TRawData extends INamedEntity> extends IMenuOption<TRawData> {
}

export function toSelectOptions<TRawData extends INamedEntity>(data: INamedEntity[]|INamedEntity): SelectOptionT[] {
  return orNull<SelectOptionT[]>(
      data,
      () => [].concat(data).map<SelectOptionT>((rawItem: TRawData) => ({
        value: rawItem.id,
        label: rawItem.name,
        rawData: rawItem,
      }))
  );
}

export type SelectOptionT = ISelectOption<INamedEntity>;
