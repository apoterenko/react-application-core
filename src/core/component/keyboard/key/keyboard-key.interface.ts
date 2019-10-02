import {
  IUseUppercaseWrapper,
  IValueWrapper,
  IOnSelectWrapper,
  IRendererWrapper,
  IDisabledWrapper,
  IRippledWrapper,
} from '../../../definitions.interface';
import { KeyboardKeyT } from '../../../configurations-definitions.interface';
import { IComponentProps } from '../../../definition';

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardKeyProps extends IComponentProps,
                                           IDisabledWrapper,
                                           IRippledWrapper,   // TODO Button props
                                           IRendererWrapper<(item: string) => JSX.Element>,
                                           IUseUppercaseWrapper,
                                           IOnSelectWrapper<(item: KeyboardKeyT) => void>,
                                           IValueWrapper<KeyboardKeyT> {
}
