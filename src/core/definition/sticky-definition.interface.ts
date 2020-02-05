import {
  IStickyElementClassNameWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @entity
 * @stable [23.10.2019]
 */
export interface IStickyEntity
  extends IStickyElementClassNameWrapper {
}

/**
 * @props
 * @stable [23.10.2019]
 */
export interface IStickyComponentProps
  extends IComponentProps,
    IStickyEntity {
}
