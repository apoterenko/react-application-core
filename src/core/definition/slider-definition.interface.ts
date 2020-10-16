import { IPresetsMinMaxEntity } from './entity-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IOnChangeWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [15.10.2020]
 */
export interface IPresetsSliderEntity
  extends IPresetsMinMaxEntity,
    IOnChangeWrapper<IPresetsMinMaxEntity>,
    IValueWrapper<IPresetsMinMaxEntity> {
}

/**
 * @generic-entity
 * @stable [15.10.2020]
 */
export interface IGenericSliderEntity
  extends IPresetsSliderEntity {
}

/**
 * @props
 * @stable [15.10.2020]
 */
export interface ISliderProps
  extends IGenericComponentProps,
    IGenericSliderEntity {
}

/**
 * @state
 * @stable [15.10.2020]
 */
export interface ISliderState
  extends IPresetsMinMaxEntity {
}

/**
 * @stable [15.10.2020]
 * @enum
 */
export enum SliderClassesEnum {
  SLIDER = 'rac-slider',
  SLIDER_VALUE = 'rac-slider__value',
}
