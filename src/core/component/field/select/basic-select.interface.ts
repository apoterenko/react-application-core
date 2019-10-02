import {
  IDisplayValueWrapper,
  IExpandActionRenderedWrapper,
  IForceReloadWrapper,
  INeedToOpenMenuWrapper,
  IOnDictionaryFilterChangeWrapper,
  IOnFilterChangeWrapper,
  IPayloadWrapper,
  IQueryWrapper,
  IMenuConfigurationWrapper,
} from '../../../definitions.interface';
import { ISelectOptionEntity, IMenuProps } from '../../../definition';
import { IFieldConfiguration } from '../../../configurations-definitions.interface';
import {
  IBaseTextFieldProps,
} from '../textfield/base-textfield.interface';
import { IFieldState } from '../field/field.interface';

/**
 * @stable [06.10.2018]
 */
export interface IBasicSelectState extends IFieldState,
                                           INeedToOpenMenuWrapper,
                                           IDisplayValueWrapper {
}

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectConfiguration extends IFieldConfiguration,
                                                   IExpandActionRenderedWrapper {
  onClose?(): void;
}

// TODO
export interface IBaseSelectProps
  extends IBasicSelectConfiguration,
    IBaseTextFieldProps,
    IMenuConfigurationWrapper<IMenuProps>,
    IForceReloadWrapper,
    IOnDictionaryFilterChangeWrapper<(dictionary: string, wrapper: IPayloadWrapper<IQueryWrapper>) => void>,
    IOnFilterChangeWrapper<(query: string) => void> {
  icon?: string; // TODO
  options?: ISelectOptionEntity[] | (() => ISelectOptionEntity[]);

  onSelect?(option: ISelectOptionEntity): void;
}
