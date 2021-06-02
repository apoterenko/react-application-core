import {
  BooleanFnT,
  IClosableWrapper,
  IDisabledWrapper,
  IInlineOptionConfigurationWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOptionWrapper,
  ISelectedWrapper,
  StringFnT,
} from '../definitions.interface';
import {
  GenericComponentT,
  IPresetsComponentEntity,
} from './generic-component-definition.interface';
import { IPresetsRawDataLabeledValueEntity } from './entity-definition.interface';
import { IPresetsSelectOptionEntity } from './select-definition.interface';

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsInlineOptionEntity
  extends IPresetsComponentEntity<GenericComponentT, StringFnT<IPresetsSelectOptionEntity>>,
    IClosableWrapper<BooleanFnT<IPresetsSelectOptionEntity>>,
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
  extends IGenericInlineOptionEntity {
}

/**
 * @configuration-entity
 * @stable [02.06.2021]
 */
export interface IInlineOptionConfigurationEntity<TProps = IInlineOptionProps>
  extends IInlineOptionConfigurationWrapper<TProps> {
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
