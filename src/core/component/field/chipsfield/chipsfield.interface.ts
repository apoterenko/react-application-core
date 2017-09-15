import {
  IBasicSelectInternalState,
  IBasicSelectInternalProps,
  ISelectOption
} from 'core/component/field';
import { IEntity, EntityIdT } from 'core/definition.interface';

export type ChipsFieldItemT = IEntity|ISelectOption;

export interface IChipsFieldInternalState extends IBasicSelectInternalState {
  add: EntityIdT[];
  remove: EntityIdT[];
}

export interface IChipsFieldInternalProps extends IBasicSelectInternalProps {
  labelField?: string;
  idField?: string;
}
