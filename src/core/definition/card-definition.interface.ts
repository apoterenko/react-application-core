import {
  IDisabledWrapper,
  IEntity,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsRowEntity } from './row-definition.interface';

/**
 * @presets-entity
 * @stable [08.06.2020]
 */
export interface IPresetsCardEntity<TRawData extends IEntity = IEntity>
  extends IPresetsRowEntity<TRawData>,
    IDisabledWrapper {
}

/**
 * @generic-entity
 * @stable [08.06.2020]
 */
export interface IGenericCardEntity<TRawData extends IEntity = IEntity>
  extends IPresetsCardEntity<TRawData> {
}

/**
 * @props
 * @stable [04.05.2020]
 */
export interface ICardProps<TRawData extends IEntity = IEntity>
  extends IGenericComponentProps,
    IGenericCardEntity<TRawData> {
}

/**
 * @classes
 * @stable [08.06.2020]
 */
export enum CardClassesEnum {
  CARD = 'rac-card',
  CARD_SELECTED = 'rac-card__selected',
}
