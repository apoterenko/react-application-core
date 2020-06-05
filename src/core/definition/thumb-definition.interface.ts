import {
  IDisabledWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IGenericBaseComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [21.05.2020]
 */
export interface IPresetsThumbEntity
  extends IDisabledWrapper,
    IValueWrapper {
}

/**
 * @generic-entity
 * @stable [05.06.2020]
 */
export interface IThumbGenericEntity
  extends IPresetsThumbEntity {
}

/**
 * @props
 * @stable [05.06.2020]
 */
export interface IThumbProps
  extends IGenericBaseComponentProps,
    IThumbGenericEntity {
}
