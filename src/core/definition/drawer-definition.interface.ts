import { IMiniWrapper } from '../definitions.interface';
import { IGenericBaseComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [14.05.2020]
 */
export interface IPresetsDrawerEntity
  extends IMiniWrapper {
}

/**
 * @generic-entity
 * @stable [14.05.2020]
 */
export interface IGenericDrawerEntity
  extends IPresetsDrawerEntity {
}

/**
 * @props-entity
 * @stable [14.05.2020]
 */
export interface IDrawerProps
  extends IGenericBaseComponentProps,
    IGenericDrawerEntity {
}

/**
 * @classes
 * @stable [14.05.2020]
 */
export enum DrawerClassesEnum {
  DRAWER = 'rac-drawer',
  DRAWER_MINI = 'rac-drawer-mini',
}
