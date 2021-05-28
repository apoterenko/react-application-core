import {
  IInlineOptionClassNameWrapper,
  StringFnT,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericMultiFieldEntity } from './multi-field-definition.interface';
import { IPresetsSelectOptionEntity } from './select-definition.interface';

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsChipsFieldEntity
  extends IInlineOptionClassNameWrapper<StringFnT<IPresetsSelectOptionEntity>> {
}

/**
 * @generic-entity
 * @stable [16.06.2020]
 */
export interface IGenericChipsFieldEntity
  extends IPresetsChipsFieldEntity,
    IGenericMultiFieldEntity {
}

/**
 * @props
 * @stable [16.06.2020]
 */
export interface IChipsFieldProps
  extends IGenericComponentProps,
    IGenericChipsFieldEntity {
}

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum ChipsFieldClassesEnum {
  CHIPS_FIELD = 'rac-chips-field',
  CHIPS_FIELD_INLINE_OPTION = 'rac-chips-field__inline-option',
}
