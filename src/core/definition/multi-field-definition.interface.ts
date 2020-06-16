import { ISelectedValueIgnoredWrapper } from '../definitions.interface';
import {
  IBaseSelectProps,
  IBaseSelectState,
} from '../component/field/select/base-select.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldState
  extends IBaseSelectState {
}

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsMultiFieldEntity
  extends ISelectedValueIgnoredWrapper {
}

/**
 * @generic-entity
 * @stable [16.06.2020]
 */
export interface IGenericMultiFieldEntity
  extends IPresetsMultiFieldEntity,
    IBaseSelectProps { // TODO
}

/**
 * @props
 * @stable [16.06.2020]
 */
export interface IMultiFieldProps
  extends IGenericComponentProps,
    IGenericMultiFieldEntity {
}

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum MultiFieldClassesEnum {
  MULTI_FIELD = 'rac-multi-field',
}
