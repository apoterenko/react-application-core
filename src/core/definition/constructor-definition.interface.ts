import {
  AnyT,
  I$$nameWrapper,
} from '../definitions.interface';

/**
 * @stable [11.09.2019]
 */
export interface IConstructor {
  new(...args: AnyT[]): {};
}

/**
 * @stable [11.09.2019]
 */
export interface INamedConstructor
  extends IConstructor,
    I$$nameWrapper {
}
