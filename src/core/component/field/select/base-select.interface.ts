import {
  I$$cachedValueWrapper,
  IMenuConfigurationWrapper,
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
  IMenuProps,
  ISelectOptionEntity,
} from '../../../definition';
import { IFieldProps } from '../../../configurations-definitions.interface';
import {
  IBaseTextFieldProps,
} from '../text-field/base-textfield.interface';
import { IFieldState } from '../field/field.interface';

/**
 * @stable [06.10.2018]
 */
export interface IBaseSelectState
  extends IFieldState,
    IGenericBaseSelectState,
    I$$cachedValueWrapper<ISelectOptionEntity> {
}

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectConfiguration extends IFieldProps {
  onClose?(): void;
}

// TODO
export interface IBaseSelectProps
  extends IBasicSelectConfiguration,
    IGenericBaseSelectEntity,
    IBaseTextFieldProps,
    IMenuConfigurationWrapper<IMenuProps>,
    IOnDictionaryFilterChangeWrapper<(dictionary: string, wrapper: IPayloadWrapper<IQueryWrapper>) => void>,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  options?: ISelectOptionEntity[] | (() => ISelectOptionEntity[]);

  onSelect?(option: ISelectOptionEntity): void;
}

export interface IBaseSelect
  extends IOpenMenuWrapper<IBaseEvent> {
}
