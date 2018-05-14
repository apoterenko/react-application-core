import { IRendererWrapper } from '../../../definitions.interface';
import { INamedEntity, IMenuItemEntity } from '../../../entities-definitions.interface';
import { IMenuConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield';

export interface IBasicSelectInternalState extends IBasicTextFieldInternalState {
  emptyOptions?: boolean;
}

export interface IBasicSelectInternalProps extends IBasicTextFieldInternalProps,
                                                   IMenuConfigurationWrapper,
                                                   IRendererWrapper<SelectOptionT> {
  forceAll?: boolean;
  options?: SelectOptionT[];
  onSelect?(option: SelectOptionT): void;
}

export interface ISelectOption<TRawData extends INamedEntity> extends IMenuItemEntity<TRawData> {
}

export type SelectOptionT = ISelectOption<INamedEntity>;
