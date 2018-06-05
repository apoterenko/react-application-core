import { IEmptyOptionsWrapper } from '../../../definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IMenuConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldState,
} from '../textfield';

/**
 * @stable [01.06.2018]
 */
export interface IBasicSelectState extends IBasicTextFieldState,
                                           IEmptyOptionsWrapper {
}

// TODO
export interface IBasicSelectProps extends IBasicTextFieldInternalProps,
                                           IMenuConfigurationWrapper {
  forceAll?: boolean;
  options?: ISelectOptionEntity[];
  onSelect?(option: ISelectOptionEntity): void;
}
