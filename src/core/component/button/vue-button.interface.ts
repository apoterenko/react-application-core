import { IVueBaseProps } from '../base/vue-base.interface';
import {
  IDisabledWrapper,
  IProgressWrapper,
  ITextWrapper,
  IIconWrapper,
} from '../../definitions.interface';

/**
 * @stable [30.01.2019]
 */
export interface IVueButtonProps
  extends IVueBaseProps,
    IIconWrapper,
    IDisabledWrapper,
    IProgressWrapper,
    ITextWrapper {
}
