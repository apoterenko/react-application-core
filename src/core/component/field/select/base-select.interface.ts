import {
  I$$cachedValueWrapper,
  IOnFilterChangeWrapper,
  IOpenMenuWrapper,
} from '../../../definitions.interface';
import {
  IBaseEvent,
  IGenericBaseSelectEntity,
  IGenericBaseSelectState,
  IPresetsSelectOptionEntity,
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
    I$$cachedValueWrapper<IPresetsSelectOptionEntity> {
}

// TODO
export interface IBaseSelectProps
  extends IGenericBaseSelectEntity,
    IBaseTextFieldProps,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  onSelect?(option: IPresetsSelectOptionEntity): void;
}

export interface IBaseSelect
  extends IOpenMenuWrapper<IBaseEvent> {
}
