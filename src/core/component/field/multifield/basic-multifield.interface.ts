import { INamedEntity } from '../../../definition.interface';
import { IFieldValueAccessor } from '../field/field.interface';
import { MultiFieldEntityT } from './multifield.interface';

export interface IBasicMultiFieldChangesResult {
  addArray: INamedEntity[];
  removeArray: INamedEntity[];
}

export interface IBasicMultiFieldPlugin {
  activeValue: INamedEntity[];
  originalValue: INamedEntity[];
  onAdd(item: INamedEntity): IBasicMultiFieldChangesResult|void;
  onDelete(item: INamedEntity): IBasicMultiFieldChangesResult|void;
}

export type BasicMultiFieldT = IFieldValueAccessor<MultiFieldEntityT<INamedEntity>>;
