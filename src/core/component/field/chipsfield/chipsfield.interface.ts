import {
  IBasicSelectInternalState,
  IBasicSelectInternalProps,
  ISelectOption, IMultiFieldAttributes
} from 'core/component/field';
import { IEntity } from 'core/definition.interface';

export type ChipsFieldItemT = IEntity|ISelectOption;

export interface IChipsFieldInternalState extends IBasicSelectInternalState,
                                                  IMultiFieldAttributes {
}

export interface IChipsFieldInternalProps extends IBasicSelectInternalProps {
  labelField?: string;
  idField?: string;
}
