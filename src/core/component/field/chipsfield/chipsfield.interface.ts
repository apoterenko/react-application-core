import {
  IBasicSelectInternalState,
  IBasicSelectInternalProps,
  SelectOptionT,
  IMultiFieldAttributes,
} from '../../../component/field';
import { IEntity } from '../../../definition.interface';

export type ChipsFieldItemT = IEntity|SelectOptionT;

export interface IChipsFieldInternalState extends IBasicSelectInternalState,
                                                  IMultiFieldAttributes {
}

export interface IChipsFieldInternalProps extends IBasicSelectInternalProps {
  valuesMessage?: string;
  labelField?: string;
  idField?: string;
}
