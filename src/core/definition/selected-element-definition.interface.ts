import {
  ISelectedElementClassNameWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import { IStickyEntity } from './sticky-definition.interface';

/**
 * @stable [23.10.2019]
 */
export interface ISelectedElementEntity
  extends ISelectedElementClassNameWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface ISelectedElementComponentProps
  extends IComponentProps,
    ISelectedElementEntity,
    IStickyEntity {
}
