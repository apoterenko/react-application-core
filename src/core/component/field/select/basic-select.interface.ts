import {
  INeedToOpenMenuWrapper,
  IForceReloadWrapper,
  IExpandActionRenderedWrapper,
  IDisplayValueWrapper,
} from '../../../definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IMenuConfigurationWrapper, IFieldConfiguration } from '../../../configurations-definitions.interface';
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
export interface IBasicSelectProps extends IBasicSelectConfiguration,
                                           IBaseTextFieldProps,
                                           IMenuConfigurationWrapper,
                                           IForceReloadWrapper {
  icon?: string; // TODO
  options?: ISelectOptionEntity[];
  onSelect?(option: ISelectOptionEntity): void;
}
