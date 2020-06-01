import {
  IEntity,
  ILastWrapper,
  IOddWrapper,
  IOnClickWrapper,
  IRawDataWrapper,
  ISelectedWrapper,
} from '../definitions.interface';
import { IPresetsSelectableHoveredEntity } from './entity-definition.interface';

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
interface IPresetsBaseRowEntity<TRawData extends IEntity = IEntity>
  extends IPresetsSelectableHoveredEntity,
    IOnClickWrapper<TRawData>,
    IRawDataWrapper<TRawData> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsSimpleRowEntity<TRawData extends IEntity = IEntity>
  extends IPresetsBaseRowEntity<TRawData>,
    ILastWrapper,
    IOddWrapper,
    ISelectedWrapper {
}
