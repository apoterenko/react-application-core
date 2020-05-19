import {
  I$$cachedValueWrapper,
  IOnFilterChangeWrapper,
  IOpenMenuWrapper,
} from '../../../definitions.interface';
import {
  IBaseEvent,
  IGenericBaseSelectEntity,
  IGenericBaseSelectState,
  ISelectOptionEntity,
} from '../../../definition';
import {
  IBaseTextFieldProps,
} from '../text-field/base-textfield.interface';
import { IField2State } from '../field/field.interface';

/**
 * @stable [06.10.2018]
 */
export interface IBaseSelectState
  extends IField2State,
    IGenericBaseSelectState,
    I$$cachedValueWrapper<ISelectOptionEntity> {
}

// TODO
export interface IBaseSelectProps
  extends IGenericBaseSelectEntity,
    IBaseTextFieldProps,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  inlineOptions?: boolean;
  onSelect?(option: ISelectOptionEntity): void;
}

export interface IBaseSelect
  extends IOpenMenuWrapper<IBaseEvent> {
}
