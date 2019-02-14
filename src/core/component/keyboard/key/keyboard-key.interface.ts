import {
  IUseUppercaseWrapper,
  IValueWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  IDisabledWrapper,
  IRippledWrapper,
} from '../../../definitions.interface';
import { KeyboardKeyT } from '../../../configurations-definitions.interface';
import { IComponentProps } from '../../../props-definitions.interface';

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKeyProps extends IComponentProps,
                                           IDisabledWrapper,
                                           IRippledWrapper,   // TODO Button props
                                           IRendererWrapper<string>,
                                           IUseUppercaseWrapper,
                                           IOnSelectWrapper<KeyboardKeyT>,
                                           IValueWrapper<KeyboardKeyT> {
}
