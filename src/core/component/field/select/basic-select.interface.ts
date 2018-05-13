import { IMenuOption } from '../../../component/menu';
import { IRendererWrapper } from '../../../definitions.interface';
import { INamedEntity } from '../../../entities-definitions.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield';
import { IMenuOptions } from '../../menu';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  emptyOptions?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IRendererWrapper<SelectOptionT> {
  menuOptions?: IMenuOptions;
  forceAll?: boolean;
  options?: SelectOptionT[];
  onSelect?(option: SelectOptionT): void;
}

export interface ISelectOption<TRawData extends INamedEntity> extends IMenuOption<TRawData> {
}

export type SelectOptionT = ISelectOption<INamedEntity>;
