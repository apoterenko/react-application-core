import {
  IOnClickWrapper,
  IOptionWrapper,
  ISelectedWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsSelectOptionEntity } from './select-definition.interface';

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsInlineOptionEntity
  extends ISelectedWrapper,
    IOptionWrapper<IPresetsSelectOptionEntity>,
    IOnClickWrapper {
}

/**
 * @generic-entity
 * @stable [16.06.2020]
 */
export interface IGenericInlineOptionEntity
  extends IPresetsInlineOptionEntity {
}

/**
 * @props
 * @stable [02.06.2020]
 */
export interface IInlineOptionProps
  extends IGenericComponentProps,
    IGenericInlineOptionEntity {
}

/**
 * @classes
 * @stable [24.03.2020]
 */
export enum InlineOptionClassesEnum {
  INLINE_OPTION = 'rac-inline-option',
  INLINE_OPTION_SELECTED = 'rac-inline-option-selected',
}
