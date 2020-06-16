import { IChipClassNameWrapper } from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericMultiFieldEntity } from './multi-field-definition.interface';

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsChipsFieldEntity
  extends IChipClassNameWrapper {
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
  CHIPS_FIELD_CHIP = 'rac-chips-field__chip',
}
