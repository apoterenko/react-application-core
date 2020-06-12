import {
  IDisabledWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

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
  extends IGenericComponentProps,
    IThumbGenericEntity {
}

/**
 * @classes
 * @stable [05.06.2020]
 */
export enum ThumbClassesEnum {
  THUMB = 'rac-thumb',
  THUMB_CHECKED = 'rac-thumb-checked',
  THUMB_DISABLED = 'rac-thumb-disabled',
  THUMB_ENABLED = 'rac-thumb-enabled',
  THUMB_UNCHECKED= 'rac-thumb-unchecked',
}
