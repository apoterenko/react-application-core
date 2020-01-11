import {
  I$$cachedValueWrapper,
  IDelayTimeoutWrapper,
  IExpandActionRenderedWrapper,
  IForceOpenEmptyMenuWrapper,
  IForceReloadWrapper,
  IMenuConfigurationWrapper,
  IOnDictionaryFilterChangeWrapper,
  IOnFilterChangeWrapper,
  IOpenMenuWrapper,
  IPayloadWrapper,
  IQueryWrapper,
} from '../../../definitions.interface';
import {
  IBaseEvent,
  IGenericBaseSelectStateEntity,
  IMenuProps,
  ISelectOptionEntity,
} from '../../../definition';
import { IFieldProps } from '../../../configurations-definitions.interface';
import {
  IBaseTextFieldProps,
} from '../textfield/base-textfield.interface';
import { IFieldState } from '../field/field.interface';

/**
 * @stable [06.10.2018]
 */
export interface IBaseSelectState
  extends IFieldState,
    IGenericBaseSelectStateEntity,
    I$$cachedValueWrapper<ISelectOptionEntity> {
}

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectConfiguration extends IFieldProps,
                                                   IExpandActionRenderedWrapper {
  onClose?(): void;
}

// TODO
export interface IBaseSelectProps
  extends IBasicSelectConfiguration,
    IBaseTextFieldProps,
    IMenuConfigurationWrapper<IMenuProps>,
    IForceReloadWrapper,
    IDelayTimeoutWrapper,
    IForceOpenEmptyMenuWrapper,
    IOnDictionaryFilterChangeWrapper<(dictionary: string, wrapper: IPayloadWrapper<IQueryWrapper>) => void>,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  options?: ISelectOptionEntity[] | (() => ISelectOptionEntity[]);

  onSelect?(option: ISelectOptionEntity): void;
}

export interface IBaseSelect
  extends IOpenMenuWrapper<IBaseEvent> {
}
