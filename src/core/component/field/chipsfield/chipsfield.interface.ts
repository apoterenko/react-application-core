import {
  IBasicSelectInternalState,
  IBasicSelectInternalProps,
} from '../../../component/field';

export interface IChipsFieldInternalState extends IBasicSelectInternalState {
}

export interface IChipsFieldInternalProps extends IBasicSelectInternalProps {
  valuesMessage?: string;
  labelField?: string;
  valueField?: string;
}
