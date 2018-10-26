import {
  IVueType$Wrapper,
  IVueValue$Wrapper,
  IVuePlaceholder$Wrapper,
} from '../../../vue-definitions.interface';
import { AnyT } from '../../../definitions.interface';

/**
 * @stable [26.10.2018]
 */
export interface IVueFieldInputPropsEntity extends IVueType$Wrapper<AnyT>,
                                                   IVueValue$Wrapper,
                                                   IVuePlaceholder$Wrapper {
}
