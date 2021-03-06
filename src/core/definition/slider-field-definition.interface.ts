import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import {
  IFieldState,
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';
import { IPresetsSliderBaseEntity } from './slider-definition.interface';
import {
  ISliderClassNameWrapper,
  StringFnT,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [15.10.2020]
 */
export interface IPresetsSliderFieldEntity
  extends IPresetsFieldEntity,
    IPresetsSliderBaseEntity,
    ISliderClassNameWrapper<StringFnT> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxSliderFieldEntity
  extends IReduxFieldEntity {
}

/**
 * @generic-entity
 * @stable [15.10.2020]
 */
export interface IGenericSliderFieldEntity
  extends IPresetsSliderFieldEntity,
    IReduxSliderFieldEntity {
}

/**
 * @props
 * @stable [15.10.2020]
 */
export interface ISliderFieldProps
  extends IEnhancedGenericComponentProps,
    IGenericSliderFieldEntity {
}

/**
 * @state
 * @stable [15.10.2020]
 */
export interface ISliderFieldState
  extends IFieldState {
}

/**
 * @stable [15.10.2020]
 * @enum
 */
export enum SliderFieldClassesEnum {
  SLIDER = 'rac-slider-field__slider',
  SLIDER_FIELD = 'rac-slider-field',
}
