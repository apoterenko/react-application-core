import {
  IDisabledWrapper,
  IEntityIdTWrapper,
  IOnClickWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [02.06.2020]
 */
export interface IPresetsChipEntity
  extends IDisabledWrapper,
    IEntityIdTWrapper,
    IOnClickWrapper {
}

/**
 * @generic-entity
 * @stable [02.06.2020]
 */
export interface IGenericChipEntity
  extends IPresetsChipEntity {
}

/**
 * @props
 * @stable [02.06.2020]
 */
export interface IChipProps
  extends IGenericComponentProps,
    IGenericChipEntity {
}

/**
 * @classes
 * @stable [24.03.2020]
 */
export enum ChipClassesEnum {
  CHIP = 'rac-chip',
  CHIP_CLOSE = 'rac-chip__close',
  CHIP_CONTENT = 'rac-chip__content',
}
