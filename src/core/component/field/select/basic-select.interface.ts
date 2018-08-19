import {
  INeedToOpenMenuWrapper,
  IForceReloadWrapper,
} from '../../../definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IMenuConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IBasicTextFieldProps,
  IBasicTextFieldState,
} from '../textfield';

/**
 * @stable [01.06.2018]
 */
export interface IBasicSelectState extends IBasicTextFieldState,
                                           INeedToOpenMenuWrapper {
}

// TODO
export interface IBasicSelectProps extends IBasicTextFieldProps,
                                           IMenuConfigurationWrapper,
                                           IForceReloadWrapper {
  notUseExpandAction?: boolean;
  options?: ISelectOptionEntity[];
  onSelect?(option: ISelectOptionEntity): void;
}
