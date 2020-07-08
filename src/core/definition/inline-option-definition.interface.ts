import {
  IClosableWrapper,
  IDisabledWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOptionWrapper,
  ISelectedWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsRawDataLabeledValueEntity } from './entity-definition.interface';

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsInlineOptionEntity
  extends IClosableWrapper,
    IDisabledWrapper,
    IOnClickWrapper<IPresetsRawDataLabeledValueEntity>,
    IOnCloseWrapper<IPresetsRawDataLabeledValueEntity>,
    IOptionWrapper<IPresetsRawDataLabeledValueEntity>,
    ISelectedWrapper {
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
  INLINE_OPTION_CLOSE = 'rac-inline-option__close',
  INLINE_OPTION_CONTENT = 'rac-inline-option__content',
  INLINE_OPTION_DISABLED = 'rac-inline-option-disabled',
  INLINE_OPTION_SELECTED = 'rac-inline-option-selected',
}
