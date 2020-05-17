import {
  I$$cachedValueWrapper,
  IOnDictionaryFilterChangeWrapper,
  IOnFilterChangeWrapper,
  IOpenMenuWrapper,
  IPayloadWrapper,
  IQueryWrapper,
} from '../../../definitions.interface';
import {
  IBaseEvent,
  IGenericBaseSelectEntity,
  IGenericBaseSelectState,
  ISelectOptionEntity,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';
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

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectConfiguration extends IFieldProps2 {
  onClose?(): void;
}

// TODO
export interface IBaseSelectProps
  extends IBasicSelectConfiguration,
    IGenericBaseSelectEntity,
    IBaseTextFieldProps,
    IOnDictionaryFilterChangeWrapper<(dictionary: string, wrapper: IPayloadWrapper<IQueryWrapper>) => void>,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  inlineOptions?: boolean;
  onSelect?(option: ISelectOptionEntity): void;
}

export interface IBaseSelect
  extends IOpenMenuWrapper<IBaseEvent> {
}
