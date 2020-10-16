import { IPresetsMinMaxEntity } from './entity-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IFieldConfigurationWrapper,
  IOnChangeWrapper,
  IStepWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { INumberFieldProps } from '../component/field/numberfield/numberfield.interface';  // TODO

/**
 * @presets-entity
 * @stable [15.10.2020]
 */
export interface IPresetsSliderBaseEntity
  extends IPresetsMinMaxEntity,
    IFieldConfigurationWrapper<INumberFieldProps>,
    IStepWrapper {
}

/**
 * @presets-entity
 * @stable [15.10.2020]
 */
export interface IPresetsSliderEntity
  extends IPresetsSliderBaseEntity,
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
 * @stable [16.10.2020]
 */
export const DEFAULT_SLIDER_ENTITY = Object.freeze<IPresetsSliderBaseEntity>({
  max: 100,
  min: 0,
  step: 1,
});

/**
 * @stable [15.10.2020]
 * @enum
 */
export enum SliderClassesEnum {
  SLIDER = 'rac-slider',
  SLIDER_FIELDS_WRAPPER = 'rac-slider__fields-wrapper',
}
