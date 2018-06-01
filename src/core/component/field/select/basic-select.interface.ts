import { IEmptyOptionsWrapper } from '../../../definitions.interface';
import { INamedEntity, IMenuItemEntity } from '../../../entities-definitions.interface';
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

export interface IBasicSelectProps extends IBasicTextFieldInternalProps,
                                           IMenuConfigurationWrapper {
  forceAll?: boolean;
  options?: ISelectOptionEntity[];
  onSelect?(option: ISelectOptionEntity): void;
}

/**
 * @stable [01.06.2018]
 */
export interface ISelectOptionEntity<TRawData extends INamedEntity = INamedEntity>
  extends IMenuItemEntity<TRawData> {
}
