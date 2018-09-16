import {
  INeedToOpenMenuWrapper,
  IForceReloadWrapper,
  IExpandActionRenderedWrapper,
} from '../../../definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IMenuConfigurationWrapper, IFieldConfiguration } from '../../../configurations-definitions.interface';
import {
  IBasicTextFieldProps,
} from '../textfield';
import { IFieldState } from '../field/field.interface';

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectState extends IFieldState,
                                           INeedToOpenMenuWrapper {
}

/**
 * @stable [15.09.2018]
 */
export interface IBasicSelectConfiguration extends IFieldConfiguration,
                                                   IExpandActionRenderedWrapper {
}

// TODO
export interface IBasicSelectProps extends IBasicSelectConfiguration,
                                           IBasicTextFieldProps,
                                           IMenuConfigurationWrapper,
                                           IForceReloadWrapper {
  options?: ISelectOptionEntity[];
  onSelect?(option: ISelectOptionEntity): void;
}
