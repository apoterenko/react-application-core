import {
  IPresetsBaseSelectEntity,
  IReduxBaseSelectEntity,
} from './select-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IOptionClassNameWrapper,
  StringFnT,
} from '../definitions.interface';

/**
 * @redux-entity
 * @stable [13.03.2021]
 */
export interface IReduxRadioGroupEntity
  extends IReduxBaseSelectEntity {
}

/**
 * @presets-entity
 * @stable [13.03.2021]
 */
export interface IPresetsRadioGroupEntity
  extends IPresetsBaseSelectEntity,
    IOptionClassNameWrapper<StringFnT> {
}

/**
 * @generic-entity
 * @stable [19.05.2020]
 */
export interface IGenericRadioGroupEntity
  extends IReduxRadioGroupEntity,
    IPresetsRadioGroupEntity {
}

/**
 * @props
 * @stable [13.03.2021]
 */
export interface IRadioGroupProps
  extends IGenericComponentProps,
    IGenericRadioGroupEntity {
}

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum RadioGroupClassesEnum {
  RADIO_GROUP = 'rac-radio-group',
}
