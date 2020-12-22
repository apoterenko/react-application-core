import {
  IDisableLabelWrapper,
  IThumbClassNameWrapper,
} from '../definitions.interface';
import {
  IFieldInputProps,
  IFieldState,
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [21.12.2020]
 */
export interface IPresetsBaseCheckboxEntity
  extends IPresetsFieldEntity,
    IDisableLabelWrapper {
}

/**
 * @presets-entity
 * @stable [22.12.2020]
 */
export interface IPresetsSwitchEntity
  extends IPresetsBaseCheckboxEntity,
    IThumbClassNameWrapper {
}

/**
 * @redux-entity
 * @stable [21.12.2020]
 */
export interface IReduxBaseCheckboxEntity
  extends IReduxFieldEntity {
}

/**
 * @redux-entity
 * @stable [22.12.2020]
 */
export interface IReduxSwitchEntity
  extends IReduxBaseCheckboxEntity {
}

/**
 * @generic-entity
 * @stable [21.12.2020]
 */
export interface IGenericBaseCheckboxEntity
  extends IPresetsBaseCheckboxEntity,
    IReduxBaseCheckboxEntity {
}

/**
 * @generic-entity
 * @stable [22.12.2020]
 */
export interface IGenericSwitchEntity
  extends IPresetsSwitchEntity,
    IReduxSwitchEntity {
}

/**
 * @props
 * @stable [21.12.2020]
 */
export interface IBaseCheckboxProps
  extends IEnhancedGenericComponentProps,
    IGenericBaseCheckboxEntity {
}

/**
 * @props
 * @stable [21.12.2020]
 */
export interface ICheckboxProps
  extends IBaseCheckboxProps {
}

/**
 * @props
 * @stable [21.12.2020]
 */
export interface IRadioProps
  extends IBaseCheckboxProps {
}

/**
 * @props
 * @stable [22.12.2020]
 */
export interface ISwitchProps
  extends IEnhancedGenericComponentProps,
    IGenericSwitchEntity {
}

/**
 * @state
 * @stable [22.12.2020]
 */
export interface IBaseCheckboxState
  extends IFieldState {
}

/**
 * @props
 * @stable [21.12.2020]
 */
export interface IBaseCheckboxInputProps
  extends IFieldInputProps {
}

/**
 * @classes
 * @stable [05.06.2020]
 */
export enum CheckboxClassesEnum {
  BASE_CHECKBOX = 'rac-base-checkbox',
  BASE_CHECKBOX_CHECKED = 'rac-base-checkbox__checked',
  BASE_CHECKBOX_UNCHECKED = 'rac-base-checkbox__unchecked',
  CHECKBOX = 'rac-checkbox',
  RADIO = 'rac-radio',
}
