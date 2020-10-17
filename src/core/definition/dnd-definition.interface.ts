import {
  IDisabledWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [17.10.2020]
 */
export interface IPresetsDndEntity
  extends IDisabledWrapper,
    IOnSelectWrapper<File[]> {
}

/**
 * @generic-entity
 * @stable [17.10.2020]
 */
export interface IGenericDndEntity
  extends IPresetsDndEntity {
}

/**
 * @props
 * @stable [17.10.2020]
 */
export interface IDndProps
  extends IGenericComponentProps,
    IGenericDndEntity {
}

/**
 * @classes
 * @stable [17.10.2020]
 */
export enum DndClassesEnum {
  DND = 'rac-dnd',
}
