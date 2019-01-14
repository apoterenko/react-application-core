import {
  IUseUppercaseWrapper,
  IValueWrapper,
  IOnSelectWrapper,
} from '../../../definitions.interface';
import { IComponentConfiguration, KeyboardKeyT } from '../../../configurations-definitions.interface';

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKeyConfiguration extends IComponentConfiguration,
                                                   IUseUppercaseWrapper,
                                                   IOnSelectWrapper<KeyboardKeyT> {
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKeyEntity extends IValueWrapper<KeyboardKeyT> {
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKeyProps extends IKeyboardKeyConfiguration,
                                           IKeyboardKeyEntity {
}
