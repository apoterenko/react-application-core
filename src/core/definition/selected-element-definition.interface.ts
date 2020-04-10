import {
  IRefreshOnUpdateWrapper,
  ISelectedElementClassNameWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IStickyEntity } from './sticky-definition.interface';

/**
 * @stable [23.10.2019]
 */
export interface ISelectedElementEntity
  extends ISelectedElementClassNameWrapper,
    IRefreshOnUpdateWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface ISelectedElementComponentProps
  extends IGenericComponentProps,
    ISelectedElementEntity,
    IStickyEntity {
}
