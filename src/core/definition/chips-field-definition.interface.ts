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
  FIELD_CHIP = 'rac-field__chip',
  FIELD_CHIPS = 'rac-field__chips',
}
