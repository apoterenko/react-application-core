import {
  IStickyElementClassNameWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsStickyEntity
  extends IStickyElementClassNameWrapper {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericStickyEntity
  extends IPresetsStickyEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface IStickyComponentProps
  extends IGenericComponentProps,
    IGenericStickyEntity {
}
