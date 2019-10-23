import {
  IStickyElementClassNameWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @stable [23.10.2019]
 */
export interface IStickyEntity
  extends IStickyElementClassNameWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface IStickyComponentProps
  extends IComponentProps,
    IStickyEntity {
}
