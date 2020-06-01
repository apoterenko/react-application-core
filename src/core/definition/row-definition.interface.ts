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
export interface IPresetsRowEntity<TRawData extends IEntity = IEntity>
  extends IPresetsSelectableHoveredEntity,
    ILastWrapper,
    IOddWrapper,
    IOnClickWrapper<TRawData>,
    IRawDataWrapper<TRawData>,
    ISelectedWrapper {
}
