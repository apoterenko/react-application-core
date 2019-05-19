import {
  IClassNameWrapper,
  IFullWrapper,
  ITitleWrapper,
} from '../../definitions.interface';

/**
 * @stable [21.12.2018]
 */
export interface IVueBaseProps
  extends IClassNameWrapper<string | ((...args) => string)>,
    IFullWrapper,
    ITitleWrapper {
}
